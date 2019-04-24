import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
export class OrdersGetService {

  odersEndpoint = '~api/orders';
  constructor(
    private http: HttpClient
    ) {}

  getOrder(order_id: number): Observable<Order> {
    return this.http.get<Order>(this.odersEndpoint+ '/read/' + order_id, httpOptions)
    .pipe(
      map(order => {
        return this.formatToLocaleTimeOrder(order);
      })
    )
  }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.odersEndpoint+ '/read', httpOptions)
    .pipe(
      map(orders => {
        return this.formatToLocaleTimeOrders(orders);
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
      // Convert UTC to local date
      let date = new Date(order.date);
      const timeOffset = date.getTimezoneOffset();
      date.setMinutes(date.getMinutes() - timeOffset);
      order.date = date;
    return order
}

  formatToLocaleTimeOrders(orders: Order[]) {
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
