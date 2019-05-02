import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError, mergeMap } from 'rxjs/operators';
import { User } from '../../auth/models/user.model';
import { Restaurant } from '../../auth/models/restaurant.model';
import { AuthService } from '../auth-service/auth.service';

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

  constructor(private http: HttpClient, private authService: AuthService) { }

  postRestaurant(data: Restaurant & User): Observable<any> {
    return this.http.post<Restaurant & User>(this.restaurant, data, httpOptions)
    .pipe(
      mergeMap(_ => this.authService.askForCookies(data)),
      catchError (err => throwError(err))
    )
  }

  postUser(user: User): Observable<any> {
    return this.http.post<User>(this.employee + user.invitation_code, user, httpOptions)
    .pipe(
      mergeMap(_ => this.authService.askForCookies(user)),
      catchError (err => throwError(err))
    )
  }
}
