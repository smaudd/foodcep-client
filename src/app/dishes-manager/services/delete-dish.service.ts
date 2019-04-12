import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap} from 'rxjs/operators';
import { Dish } from 'src/app/dishes-manager/models/dish.model';

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

  private url = '/api/dishes/';

  deleteDish(id: string): Observable<Dish> {
    return this.http.delete<any>(this.url + id, httpOptions)
    .pipe(
      catchError(error => {
        return throwError(error);
      })
    );
  }


}
