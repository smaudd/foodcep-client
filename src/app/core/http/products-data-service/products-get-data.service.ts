import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Category } from '../../../modules/products/categories-list/models/category.model';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  }),
  withCredentials: true,
};

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private getIngredientsRoute = '~/api/products/read/';
  private getCategoriesRoute = '~/api/products/categories/read';
  constructor(private http: HttpClient) { }

  getProducts(query: string): Observable<any> {
      return this.http.get<any>(this.getIngredientsRoute + query, httpOptions)
  }

  getCategories(): Observable<any>  {
    return this.http.get<Category>(this.getCategoriesRoute, httpOptions);
  }

}

