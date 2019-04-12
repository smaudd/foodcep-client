import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Dish } from '../models/dish.model';
import { catchError } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  }),
  withCredentials: true
};

@Injectable({
  providedIn: 'root'
})
export class AddDishService {

  constructor(private http: HttpClient) {}

  private url = '/api/dishes/';

  postDish(dish: Dish): Observable<Dish> {
    return this.http.post<Dish>(this.url, dish, httpOptions)
    .pipe(
      catchError(error => {
        return throwError(error);
      })
    );
  }

}
