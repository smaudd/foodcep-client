import { Injectable } from '@angular/core';
import { IngredientForDish } from 'src/app/modules/shared/models/ingredient-for-dish.model';

@Injectable({
  providedIn: 'root'
})
export class OperationsService {

  constructor() { }

  calculateCost(ingredients: IngredientForDish[]): number {
    return ingredients.reduce((acumulator, currentValue) => {
      const pPP = currentValue.pPP
      return acumulator + pPP;
    }, 0)
  }

  calculateEveryPPP(ingredients: IngredientForDish[]): IngredientForDish[] {
    return ingredients.map(ingredient => {
        ingredient.pPP = ingredient.gPP * ingredient.cost / 1000;
        ingredient.pPP = Math.round( ingredient.pPP * 1e3 ) / 1e3;
        return ingredient;
    })
  }

  calculateOnePPP(ingredient: IngredientForDish): IngredientForDish {
    ingredient.pPP = ingredient.gPP * ingredient.cost / 1000;
    ingredient.pPP = Math.round( ingredient.pPP * 1e3 ) / 1e3;
    return ingredient;
  }

}
