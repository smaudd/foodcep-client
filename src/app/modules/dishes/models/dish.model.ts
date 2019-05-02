import { IngredientForDish } from '../../shared/models/ingredient-for-dish.model';

export class Dish {
    constructor(
        public name: string,
        public category: string,
        public ingredients: IngredientForDish[],
        public cost: number,
        public dish_id?: number
        ) {}
}
