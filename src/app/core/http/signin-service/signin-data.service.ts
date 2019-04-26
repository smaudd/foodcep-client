import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { User } from '../../auth/models/user.model';
import { Restaurant } from '../../auth/models/restaurant.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  }),
  withCredentials: true,
};

@Injectable({
  providedIn: 'root'
})
export class SigninDataService {

  employee = '~/signin/';
  restaurant = '~/signin/restaurant';

  constructor(private http: HttpClient) { }

  postRestaurant(data: Restaurant & User): Observable<any> {
    return this.http.post<Restaurant & User>(this.restaurant, httpOptions)
    .pipe(
      catchError (err => throwError(err))
    )
  }

  postUser(user: User): Observable<any> {
    return this.http.post<User>(this.employee, user, httpOptions)
    .pipe(
      catchError (err => throwError(err))
    )
  }
}
