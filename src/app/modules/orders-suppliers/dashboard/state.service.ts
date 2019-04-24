import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { OrdersGetService } from '../../../core/http/orders-data-service/orders.service';
import { Order } from './models/order.model';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  ordersSubject = new BehaviorSubject([]);
  orderSubject = new BehaviorSubject(null);
  loadingSubject = new BehaviorSubject(null);
  constructor(
    private ordersGetService: OrdersGetService
    ) {}

  getAll(): void {
    this.ordersGetService.getOrders()
    .subscribe((orders: Order[]) => {
      this.ordersSubject.next(orders);
    });
  }

  getOne(order_id: number): void {
    this.loadingSubject.next(true);
    this.ordersGetService.getOrder(order_id)
    .subscribe((responseOrder: Order) => {
      this.orderSubject.next(responseOrder);
      this.loadingSubject.next(false);
    });
  }

  post(order: Order): void {
    this.ordersGetService.postOrder(order)
    .subscribe((responseOrder: Order) => {
      console.log(responseOrder)
      this.ordersSubject.next([responseOrder, ...this.ordersSubject.value])
    });
  }

}
