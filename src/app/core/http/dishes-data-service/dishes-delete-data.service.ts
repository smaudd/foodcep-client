import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Dish } from '../../../modules/dishes/models/dish.model';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  }),
  withCredentials: true,
};

@Injectable({
  providedIn: 'root'
})
export class DeleteDishService {

  constructor(private http: HttpClient) { }

  private url = '~/api/dishes/delete/';

  deleteDish(dish_id: number): Observable<Dish> {
    return this.http.delete<any>(this.url + dish_id, httpOptions)
  }


}
