interface RecipeItems {
  name: string,
  gPP: number
}

export class Recipe {
  constructor(
  public dish_id: number,
  public recipe: string,
  public minimum_production: number,
  public recipe_id?: number,
  public ingredients?: RecipeItems,
  public name?: string
  ) {}
}
