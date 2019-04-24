export class IngredientForDish {
    constructor(
      public product_id: number,
      public name: string,
      public gPP: number,
      public cost: number,
      public ingredient_id?: number,
      public pPP?: number
      ) {}
}
