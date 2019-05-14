import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Order } from '../../../modules/orders-suppliers/dashboard/models/order.model';


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

  odersEndpoint = '~api/orders';
  cached: Order[] = null;
  constructor(
    private http: HttpClient
    ) {}

  getOrder(order_id: number | string): Observable<Order> {
    if (order_id === 'null') {
      return of(null)
    }
    return this.http.get<Order>(this.odersEndpoint+ '/read/' + order_id, httpOptions)
    .pipe(
      map(order => {
        return this.formatToLocaleTimeOrder(order);
      })
    )
  }

  getOrders(): Observable<Order[]> {
    if (this.cached !== null) {
      return of(this.cached)
    }
    return this.http.get<Order[]>(this.odersEndpoint + '/read', httpOptions)
    .pipe(
      tap(value => this.cached = value),
      map(orders => {
        return this.formatToLocaleTimeOrders(orders);
      })
    )
  }

  getLastOrder(): Observable<Order> {
    return this.http.get<Order>(this.odersEndpoint + '/read/last', httpOptions)
    .pipe(
      map(order => {
        return this.formatToLocaleTimeOrder(order);
      })
    )
  }

  postOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(this.odersEndpoint + '/create', order, httpOptions)
    .pipe(
      map(order => {
        return this.formatToLocaleTimeOrder(order);
      })
    )
  }


  formatToLocaleTimeOrder(order: Order) {
    if (order !== null) {
      // Convert UTC to local date
      let date = new Date(order.date);
      const timeOffset = date.getTimezoneOffset();
      date.setMinutes(date.getMinutes() - timeOffset);
      order.date = date;
      return order
    }
}

  formatToLocaleTimeOrders(orders: Order[]) {
    if (orders !== null) {
      orders.forEach(order => {
        // Convert UTC to local date
        let date = new Date(order.date);
        const timeOffset = date.getTimezoneOffset();
        date.setMinutes(date.getMinutes() - timeOffset);
        order.date = date;
      })
      return orders
    }
  }
}
