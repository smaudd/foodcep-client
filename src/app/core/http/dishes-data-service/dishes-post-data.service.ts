import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Dish } from '../../../modules/dishes/models/dish.model';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  }),
  withCredentials: true
};

@Injectable({
  providedIn: 'root'
})
export class PostDishService {

  constructor(private http: HttpClient) {}

  private url = '~/api/dishes/create';

  postDish(dish: Dish): Observable<Dish> {
    return this.http.post<Dish>(this.url, dish, httpOptions)
  }

}
