import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Recipe } from 'src/app/modules/recipes/models/recipe.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  }),
  withCredentials: true
};

@Injectable({
  providedIn: 'root'
})
export class RecipesPutService {

  constructor(private http: HttpClient) {}

  private postRecipeRoute = '~/api/recipes/update/';

  putRecipe(recipe: Recipe): Observable<Recipe> {
    return this.http.put<Recipe>(this.postRecipeRoute + recipe.recipe_id, recipe, httpOptions)
  }

}
