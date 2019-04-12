import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Order } from '../models/order.model';
import { validateBasis } from '@angular/flex-layout';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  }),
  withCredentials: true
};

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  odersEndpoint = 'api/orders/';
  constructor(
    private http: HttpClient
    ) {}

  getOrder(order: Order): Observable<Order> {
    return this.http.get<Order>(this.odersEndpoint + order._id, httpOptions)
    .pipe(
      catchError(error => {
        return throwError(error);
      })
    )
  }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.odersEndpoint, httpOptions)
    .pipe(
      map(orders => {
        orders.forEach(order => {
          const date = new Date(order.date);
          const formatedDate = `${date.getHours()}:${date.getMinutes()} ${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
          order.date = formatedDate;
        })
        return orders;
      }),
      catchError(error => {
        console.log(error)
        return throwError(error);
      })
    );
  }

  postOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(this.odersEndpoint, order, httpOptions)
    .pipe(
      catchError(error => {
        return throwError(error);
      })
    )
  }

}
