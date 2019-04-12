import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Dish } from '../models/dish.model';
import { catchError } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  }),
  withCredentils: true
};

@Injectable({
  providedIn: 'root'
})
export class UpdateDishService {

  constructor(private http: HttpClient) {}

  private url = 'api/dishes/';

  putDish(dish: Dish): Observable<Dish> {
    return this.http.put<Dish>(this.url + dish._id, dish, httpOptions)
    .pipe(
      catchError(error => {
        return throwError(error);
      })
    );
  }

}
