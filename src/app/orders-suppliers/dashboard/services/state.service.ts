import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { OrdersService } from './orders.service';
import { Order } from '../models/order.model';


@Injectable({
  providedIn: 'root'
})
export class StateService {

  ordersSubject = new BehaviorSubject([]);
  orderSubject = new BehaviorSubject(null);
  loadingSubject = new BehaviorSubject(null);
  constructor(
    private ordersService: OrdersService,
    private router: Router
    ) {}

  getAll(): void {
    this.ordersService.getOrders()
    .subscribe((orders: Order[]) => {
      this.ordersSubject.next(orders);
    }, _ => {
      this.router.navigate(['/500']);
    });
  }

  getOne(order: Order): void {
    this.ordersService.getOrder(order)
    .subscribe((responseOrder: Order) => {
      this.orderSubject.next(responseOrder);
    }, _ => {
      this.router.navigate(['/500']);
    });
  }

  post(order: Order): void {
    this.ordersService.postOrder(order)
    .subscribe((responseOrder: Order) => {
      this.orderSubject.next(responseOrder)
      this.ordersSubject.next([...this.ordersSubject.value, this.orderSubject.value])
    }, _ => {
      this.router.navigate(['/500']);
    });
  }

}
