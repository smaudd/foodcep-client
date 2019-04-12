import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap} from 'rxjs/operators';

import { Dish } from '../models/dish.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  }),
  withCredentils: true
};

@Injectable({
  providedIn: 'root'
})
export class DishesService {

  private getDishesRoute = 'api/dishes';
  private getPDFRoute = 'api/dishes/pdf/';

  constructor(private http: HttpClient) { }

  getDishes(): Observable<Dish[] | any> {
    return this.http.get<Dish[]>(this.getDishesRoute, httpOptions)
    .pipe(
      tap(_ => console.log('Fetched Dishes')),
      catchError(error => {
        return throwError(error);
      })
    );
  }

  getPDF(id: string): Observable<Dish> {
    return this.http.get<Dish | any>(this.getPDFRoute + id, httpOptions)
    .pipe(
      map(val => {
        val.ingredients.forEach(ingredient => {
          ingredient.gPP = ingredient.gPP + 'gr';
          ingredient.pPP = '€' + ingredient.pPP.toFixed(2);
        });
        return val;
      }),
      catchError(error => {
        return throwError(error);
      })
    );
  }

}
