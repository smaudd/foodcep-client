import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { Ingredient } from '../../shared/models/ingredient.model';
import { Category } from '../../registre-manager/models/category.model';
import { SortService } from './sort.service';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  }),
  withCredentials: true,
};

@Injectable({
  providedIn: 'root'
})
export class IngredientsService {

  private getIngredientsRoute = 'api/ingredients';
  private getCategoriesRoute = 'api/categories';
  private pdfRoute = 'api/ingredients/pdf';
  constructor(private http: HttpClient, private sortService: SortService, private router: Router) { }

  getIngredients(query: string): Observable<any> {
      return this.http.get<any>(this.getIngredientsRoute + query, httpOptions)
    .pipe(
      map(value => {
          value.data = this.sortService.sortList(value.data);
          return value;
        }
      ),
      catchError(error => {
        if (error.status === 500) {
          this.router.navigate(['/500']);
        }
        return throwError(error);
      })
    );
  }

  getCategories(): Observable<any>  {
    return this.http.get<Category>(this.getCategoriesRoute, httpOptions)
    .pipe(
      map(value => {
        if (value === null) {
          return throwError(null);
        } else {
          value = this.sortService.sortList(value);
          return value;
        }
      }),
      catchError(error => {
        return throwError(error);
      })
    );
  }

  getPDF(): Observable<Ingredient[]> {
    return this.http.get<Ingredient[] | any>(this.pdfRoute, httpOptions)
    .pipe(
      map(json => {
        json = this.sortService.sortListByCategory(json);
        const table = new Array();
        json.forEach(ingredient => {
          // Format with units for PDF rendering
          ingredient.pPK = '€' + ingredient.pPK;
          ingredient.finalPrice = '€' + ingredient.finalPrice;
          ingredient.loss = ingredient.loss + 'gr';
          table.push(Object.values(ingredient));
        });
        console.log(json);
        return json;
      }),
      catchError(error => {
        return throwError(error);
      })
    );
  }


}

