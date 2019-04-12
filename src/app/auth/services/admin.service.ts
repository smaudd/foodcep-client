import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { User } from '../models/user.model';
import { Restaurant } from '../models/restaurant.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  }),
  withCredentials: true,
};

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  user = 'api/admin/profile/';
  users = 'api/admin/profiles';
  newUser = 'api/admin/createUser';
  restaurant = 'api/admin/restaurant/';

  constructor(private http: HttpClient) { }

  getUser(id: string): Observable<User> {
    return this.http.get<User>(this.user + id)
    .pipe(
      catchError(error => {
        return throwError(error);
      })
    );
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.users)
    .pipe(
      catchError(error => {
        return throwError(error);
      })
    );
  }

  createUser(user: User): Observable<any> {
    return this.http.post<User>(this.newUser, user, httpOptions)
    .pipe(
      tap(_ => console.log(_)),
      catchError(error => {
        return throwError(error);
      })
    );
  }

  postRestaurantData(restaurant: Restaurant, id: String): Observable<Restaurant> {
    // Checks if the restaurant data is already registred
    if (id === '') {
      id = 'none';
    }
    console.log(id);
    return this.http.post<Restaurant>(this.restaurant + id, restaurant, httpOptions)
    .pipe(
      catchError(error => {
        return throwError(error);
      })
    );
  }
}

