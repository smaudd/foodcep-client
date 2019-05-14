import { Component, OnInit } from '@angular/core';
import { RecipesService } from 'src/app/core/http/recipes-data-service/recipes-get.service';
import { ActivatedRoute } from '@angular/router';
import { mergeMap } from 'rxjs/operators';
import { Recipe } from '../../models/recipe.model';
import { fader } from 'src/app/animations/navigation-animations';

@Component({
  selector: 'app-recipe-viewer',
  templateUrl: './recipe-viewer.component.html',
  styleUrls: ['./recipe-viewer.component.scss'],
  animations: [fader]
})
export class RecipeViewerComponent implements OnInit {

  recipe: Recipe = new Recipe(null, null, null);
  notFound = false;
  constructor(
    private recipesService: RecipesService,
    private route: ActivatedRoute
    ) { }

  ngOnInit() {
    this.route.queryParams
    .pipe(
      mergeMap(value => this.recipesService.getCompleteRecipe(value.recipe))
    ).subscribe(value => {
      value === null ? this.notFound = true : this.recipe = value
    })
  }
}
