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
export class RecipesPostService {

  constructor(private http: HttpClient) {}

  private postRecipeRoute = '~/api/recipes/create';

  postRecipe(recipe: Recipe): Observable<Recipe> {
    return this.http.post<Recipe>(this.postRecipeRoute, recipe, httpOptions)
  }

}
