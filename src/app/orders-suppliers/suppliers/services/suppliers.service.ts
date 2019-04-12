import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { Supplier } from '../models/supplier.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  }),
  withCredentials: true
};

@Injectable({
  providedIn: 'root'
})
export class SuppliersService {

  endpoint = 'api/suppliers/';

  constructor(private http: HttpClient) {}


  getSuppliers(): Observable<Supplier[]> {
    return this.http.get<Supplier[]>(this.endpoint)
    .pipe(
      catchError(error => {
        return throwError(error);
      })
    );
  }

  postSupplier(supplier: Supplier): Observable<Supplier> {
    return this.http.post<Supplier>(this.endpoint, supplier, httpOptions)
    .pipe(
      catchError(error => {
        return throwError(error);
      })
    );
  }

  putSupplier(supplier: Supplier): Observable<Supplier> {
    return this.http.put<Supplier>(this.endpoint + supplier._id, supplier, httpOptions)
    .pipe(
      catchError(error => {
        return throwError(error);
      })
    );
  }

  deleteSupplier(supplier: Supplier): Observable<Supplier> {
    return this.http.delete<Supplier>(this.endpoint + supplier._id)
    .pipe(
      catchError(error => {
        return throwError(error);
      })
    );
  }

}
