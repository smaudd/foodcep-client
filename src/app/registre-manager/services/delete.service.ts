import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  }),
  withCredentials: true,
};

@Injectable({
  providedIn: 'root'
})
export class DeleteService {

  constructor(private http: HttpClient) { }

  private deleteIngUrl = 'api/ingredients/';
  private deleteCatUrl = 'api/categories/';

  deleteIngredient(id: string): Observable<any> {
    return this.http.delete(this.deleteIngUrl + id, httpOptions).
    pipe(
      catchError(error => {
        return throwError(error);
      })
    );
  }

  deleteCategory(id: string): Observable<any> {
      return this.http.delete(this.deleteCatUrl + id, httpOptions).
      pipe(
        catchError(error => {
          return throwError(error);
        })
      );

  }

}
