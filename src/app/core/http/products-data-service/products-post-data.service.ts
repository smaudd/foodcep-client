import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  }),
  withCredentials: true
};

import { Ingredient } from '../../../modules/shared/models/ingredient.model';
import { Category } from '../../../modules/products/categories-list/models/category.model';


@Injectable({
  providedIn: 'root'
})
export class ProductPostService {

  constructor(private http: HttpClient) {}

  private ingredientsUrl = '~/api/products/create';
  private categoriesUrl = '~/api/products/categories/create';

  postProduct(ingredient: Ingredient): Observable<Ingredient> {
    return this.http.post<Ingredient>(this.ingredientsUrl, ingredient, httpOptions)
  }

  postCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(this.categoriesUrl, category, httpOptions)
  }

}
