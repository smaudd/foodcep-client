import { IngredientForDish } from '../../shared/models/ingredient-for-dish.model';

export class Dish {
    constructor(public name: string, public category: string,
        public ingredients: IngredientForDish[],
        public total: number,
        public _id?: string
        ) {}
}
