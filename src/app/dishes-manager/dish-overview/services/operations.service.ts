import { Injectable } from '@angular/core';
import { IngredientForDish } from 'src/app/shared/models/ingredient-for-dish.model';

@Injectable({
  providedIn: 'root'
})
export class OperationsService {

  constructor() { }

  calculateTotal(data: any): number {
    let total = 0;
    for (let i = 0; i < data.length; i++) {
      total += data[i].pPP;
    }
    return total;
  }

  calculatePPP(ingredient: IngredientForDish, newValue: number) {
    ingredient.pPP = newValue * ingredient.pPP / ingredient.gPP;
    ingredient.gPP = newValue;
    ingredient.pPP = Math.round( ingredient.pPP * 1e3 ) / 1e3;
    console.log(ingredient.pPP);
    return ingredient.pPP;
  }

}
