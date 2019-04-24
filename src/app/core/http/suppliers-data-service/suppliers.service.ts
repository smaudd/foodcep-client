import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { Supplier } from '../../../modules/orders-suppliers/suppliers/models/supplier.model';

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

  endpoint = '~/api/suppliers';

  constructor(private http: HttpClient) {}


  getSuppliers(): Observable<Supplier[]> {
    return this.http.get<Supplier[]>(this.endpoint + '/read')
  }

  getOneSupplier(supplier_id: number): Observable<Supplier> {
    return this.http.get<Supplier>(this.endpoint + '/read/' + supplier_id)
  }

  postSupplier(supplier: Supplier): Observable<Supplier> {
    return this.http.post<Supplier>(this.endpoint + '/create', supplier, httpOptions)
  }

  putSupplier(supplier: Supplier): Observable<Supplier> {
    return this.http.put<Supplier>(this.endpoint + '/update/' + supplier.supplier_id, supplier, httpOptions)
  }

  deleteSupplier(supplier: Supplier): Observable<Supplier> {
    return this.http.delete<Supplier>(this.endpoint  + '/delete/' + supplier.supplier_id)
  }

}
