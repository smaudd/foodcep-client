import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap} from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  }),
  withCredentials: true
};

import { Ingredient } from '../../shared/models/ingredient.model';
import { Category } from '../models/category.model';


@Injectable({
  providedIn: 'root'
})
export class AddService {

  constructor(private http: HttpClient) {}

  private ingredientsUrl = '/api/ingredients';
  private categoriesUrl = '/api/categories';

  postIngredient(ingredient: Ingredient): Observable<Ingredient> {
    return this.http.post<Ingredient>(this.ingredientsUrl, ingredient, httpOptions)
    .pipe(
      catchError(error => {
        return throwError(error);
      })
    );
  }

  postCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(this.categoriesUrl, category, httpOptions)
    .pipe(
      catchError(error => {
        return throwError(error);
      })
    );
  }

}
