import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Ingredient } from '../../../modules/shared/models/ingredient.model';
import { Category } from '../../../modules/products/categories-list/models/category.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  }),
  withCredentials: true
};

@Injectable({
  providedIn: 'root'
})
export class ProductPutService {


  constructor(private http: HttpClient) { }

  private ingUrl = '~/api/products/update/';
  private catUrl = '~/api/products/categories/update/';

  putProductData(ingredient: Ingredient): Observable<Ingredient> {
    return this.http.put<Ingredient>(this.ingUrl + ingredient.product_id, ingredient, httpOptions)
  }

  putCategoryData(category: Category): Observable<Category> {
    return this.http.put<Category>(this.catUrl + category.category_id, category, httpOptions)
  }

}
