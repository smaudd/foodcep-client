import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Dish } from '../../../modules/dishes/models/dish.model';
import { catchError } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
import { IPatch } from '../../../modules/dishes/models/patch.interface';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  }),
  withCredentils: true
};

@Injectable({
  providedIn: 'root'
})
export class PatchDishService {

  constructor(private http: HttpClient) {}

  private url = '~/api/dishes/patch/';

  patchDish(patchArray: IPatch[], dish_id: number): Observable<Dish> {
    return this.http.patch<Dish>(this.url + dish_id, patchArray, httpOptions);
  }

}
