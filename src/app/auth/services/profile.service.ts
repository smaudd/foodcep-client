import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Restaurant } from '../models/restaurant.model';
import { SessionDataService } from './session-data.service';

import { User } from '../models/user.model';
import { INameChange, IPasswordChange, IEmailChange, ILanguageChange, IDelete, IRoleChange } from '../models/input.interfaces';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  }),
  withCredentials: true,
};

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  userUrl = 'api/user/profile';
  restaurant = 'api/restaurant/';

  constructor(private http: HttpClient, private sessionDataService: SessionDataService) { }

  getProfile(): Observable<User> {
    // The query use the SESSION_ID cookie to know which user is requesting its data
    return this.http.get<User>(this.userUrl)
    .pipe(
      catchError(error => {
        console.log(error);
        return throwError(error);
      })
    );
  }

  putName(userData: INameChange, endpoint: string): Observable<User> {
    return this.http.put<INameChange>(endpoint, userData, httpOptions)
    .pipe(
      catchError(error => {
        console.log(error);
        return throwError(error);
      })
    );
  }

  putEmail(userData: IEmailChange, endpoint: string): Observable<User> {
    return this.http.put<IEmailChange>(endpoint, userData, httpOptions)
    .pipe(
      catchError(error => {
        return throwError(error);
      })
    );
  }

  putPassword(userData: IPasswordChange, endpoint: string): Observable<User> {
    return this.http.put<IPasswordChange>(endpoint, userData, httpOptions)
    .pipe(
      catchError(error => {
        return throwError(error);
      }
      )
    );
  }

  putRole(userData: IRoleChange, endpoint: string): Observable<User> {
    return this.http.put<IRoleChange>(endpoint, userData, httpOptions)
    .pipe(
      catchError(error => {
        return throwError(error);
      })
    );
  }

  deleteAccount(userData: IDelete, endpoint: string): Observable<User> {
    return this.http.post<IDelete>(endpoint, userData, httpOptions)
    .pipe(
      catchError(error => {
        return throwError(error);
      })
    );
  }

  defaultLanguage(userData: ILanguageChange, endpoint: string): Observable<User> {
    return this.http.post<any>(endpoint, userData, httpOptions)
    .pipe(
      catchError(error => {
        return throwError(error);
      })
    );
  }

  getRestaurantData(): Observable<Restaurant> {
    return this.http.get<Restaurant>(this.restaurant, httpOptions)
    .pipe(
      tap(restaurant => {
        // Send the restaurant name to SesionDataService
        this.sessionDataService.restaurantSubject.next(restaurant.name);
      }),
      catchError(error => {
        return throwError(error);
      })
    );
  }

}
