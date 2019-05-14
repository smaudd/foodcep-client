import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { DishesService } from 'src/app/core/http/dishes-data-service/dishes-get-data.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Recipe } from '../../models/recipe.model';
import { StateService } from '../services/state.service';
import { mergeMap, take } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipesService } from 'src/app/core/http/recipes-data-service/recipes-get.service';
import { of } from 'rxjs';
import { fader } from 'src/app/animations/navigation-animations';


@Component({
  selector: 'app-create-recipe',
  templateUrl: './create-recipe.component.html',
  styleUrls: ['./create-recipe.component.scss'],
  animations: [fader]
})
export class CreateRecipeComponent implements OnInit {

  get dish() { return this.recipeForm.get('dish') }
  get recipeDirections() { return this.recipeForm.get('recipeDirections') }
  recipe: Recipe = new Recipe(null, null, null);
  isUpdate = false;
  @Output() done = new EventEmitter();
  minimum_production = 1;
  dishes$ = this.dishesService.getDishesWithoutRecipe();
  recipeForm: FormGroup;

  constructor(
    private dishesService: DishesService,
    private stateService: StateService,
    private fb: FormBuilder,
    private recipesService: RecipesService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.recipeForm = this.fb.group({
      dish: new FormControl(null, [Validators.required]),
      recipeDirections: new FormControl('', [Validators.required])
    })

    this.route.queryParams
      .pipe(
        mergeMap(value => {
          if (value.update) {
              // Prevents this unnecesary request if we're editing
              this.dishes$  = of(null)
              this.isUpdate = true;
              return this.recipesService.getCompleteRecipe(value.recipe);
          } else {
            // If we aren't updating just subscribe to a null obsevable
            return of(null)
          }
      })
      ).subscribe(value => {
        if (value !== null) {
          this.initForUpdate(value);
        }
      })
  }

  initForUpdate(value: any): void {
    this.recipe = value
    this.minimum_production = value.minimum_production;
    this.recipeForm.get('recipeDirections').setValue(value.recipe);
    this.recipeForm.get('dish').setValue(value.dish_id);
  }

  saveRecipe(recipeForm: any) {
    this.isUpdate ? this.updateRecipe(recipeForm) : this.createRecipe(recipeForm)
  }

  createRecipe(recipeForm: any) {
    const recipe: Recipe = new Recipe(recipeForm.dish, recipeForm.recipeDirections, this.minimum_production);
    this.stateService.post(recipe);
    this.done.emit(true);
  }

  updateRecipe(recipeForm: any) {
    const recipe: Recipe = new Recipe(this.recipe.dish_id, recipeForm.recipeDirections, this.minimum_production, this.recipe.recipe_id);
    this.stateService.put(recipe);
    this.router.navigate(['/recipes']);
  }

  setMinimumProduction(value: number) {
    this.minimum_production = value;
  }

}
