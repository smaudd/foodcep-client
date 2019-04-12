import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { IDelete, IPasswordChange } from '../models/input.interfaces';
import { User } from '../models/user.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  }),
  withCredentials: true,
};

@Injectable({
  providedIn: 'root'
})
export class ValidPasswordService {

    checkPass = 'api/user/checkCurrentPassword';
    constructor(private http: HttpClient) {}

    checkPassword(userData: any): Observable<any> {
        return this.http.post<User>(this.checkPass, userData, httpOptions)
        .pipe(
          catchError(error => {
           return throwError(error);
          })
        );
    }

}
