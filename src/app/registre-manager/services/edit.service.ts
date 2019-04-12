import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Ingredient } from '../../shared/models/ingredient.model';
import { Category } from '../models/category.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  }),
  withCredentials: true
};

@Injectable({
  providedIn: 'root'
})
export class EditService {


  constructor(private http: HttpClient) { }

  private ingUrl = '/api/ingredients/';
  private catUrl = '/api/categories/';

  putIngredientData(ingredient: Ingredient): Observable<Ingredient> {
    return this.http.put<Ingredient>(this.ingUrl + ingredient._id, ingredient, httpOptions)
    .pipe(
      catchError(error => {
        return throwError(error);
      })
    );

  }

  putCategoryData(category: Category): Observable<Category> {
    console.log(category);
    return this.http.put<Category>(this.catUrl + category._id, category, httpOptions)
    .pipe(
      catchError(error => {
        return throwError(error);
      })
    );

  }

}
