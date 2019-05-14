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
export class RecipesDeleteService {

  constructor(private http: HttpClient) {}

  private postRecipeRoute = '~/api/recipes/delete/';

  deleteRecipe(recipe: Recipe): Observable<Recipe> {
    return this.http.delete<Recipe>(this.postRecipeRoute + recipe.recipe_id, httpOptions)
  }

}
