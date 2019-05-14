import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Recipe } from 'src/app/modules/recipes/models/recipe.model';
import { tap, map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  }),
  withCredentials: true,
};

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  private getRecipesRoute = '~/api/recipes/read';
  private getCompleteRecipeRoute = '~/api/recipes/read/complete/'
  constructor(private http: HttpClient) { }

  getRecipes(): Observable<Recipe[]> {
      return this.http.get<Recipe[]>(this.getRecipesRoute, httpOptions)
  }

  getCompleteRecipe(recipe_id: number): Observable<Recipe> {
    return this.http.get<Recipe>(this.getCompleteRecipeRoute + recipe_id, httpOptions);
  }


}
