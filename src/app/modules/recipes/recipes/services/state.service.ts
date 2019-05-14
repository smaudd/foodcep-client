import { Injectable } from '@angular/core'
import { RecipesService } from '../../../../core/http/recipes-data-service/recipes-get.service';
import { RecipesPostService } from '../../../../core/http/recipes-data-service/recipes-post.service';
import { RecipesPutService } from '../../../../core/http/recipes-data-service/recipes-put.service';
import { RecipesDeleteService } from '../../../../core/http/recipes-data-service/recipes-delete.service';
import { first, tap } from 'rxjs/operators';
import { Recipe } from '../../models/recipe.model';
import { Observable, of, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  data$: Observable<Recipe[]>;
  loading$ = new BehaviorSubject(true);
  cached: Recipe[] = null;
  constructor(
    private getRecipesService: RecipesService,
    private postRecipesService: RecipesPostService,
    private putRecipesService: RecipesPutService,
    private deleteRecipesService: RecipesDeleteService
  ) {}

  get(): Observable<Recipe[]> {
  if (this.cached !== null) {
    this.loading(false);
    return this.refreshFromCache();
  } else {
    this.loading(false);
    return this.getRecipesService.getRecipes()
    .pipe(
      first(),
      tap((data: Recipe[]) => {
        this.cached = data;
      })
    )
  }
  }

  post(recipe: Recipe) {
    this.loading(true);
    this.postRecipesService.postRecipe(recipe)
    .subscribe(recipe => {
      this.change(recipe, 'post')
    })
  }

  put(recipe: Recipe) {
    this.loading(true);
    this.putRecipesService.putRecipe(recipe)
    .subscribe(recipe => {
      this.change(recipe, 'put')
    })
  }

  delete(recipe: Recipe) {
    this.loading(true);
    this.deleteRecipesService.deleteRecipe(recipe)
    .subscribe(_ => {
      this.change(recipe, 'delete')
    })
  }

  change(recipe: Recipe, action: string) {
    switch(action) {
      case 'post':
      this.cached.push(recipe);
      break;
      case 'delete':
      this.cached = this.cached.filter(data => data.recipe_id !== recipe.recipe_id)
      break;
      case 'put':
      this.cached
        .filter(data => data.recipe_id !== recipe.recipe_id)
        .push(recipe);
      break
    }
    this.loading(false);
  }

  refreshFromCache(): Observable<Recipe[]> {
    return of(this.cached);
  }

  loading(value: boolean) {
    this.loading$.next(value);
  }

}
