import { Component, OnInit } from '@angular/core';
import { StateService } from './state.service';
import { Order } from './models/order.model';
import { MatDialog } from '@angular/material';
import { OrderOverviewDialogComponent } from './orders/order-overview-dialog.component';
import { skip, take } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],

})
export class DashboardComponent implements OnInit {

  orders$ = this.stateService.ordersSubject;
  order$ = this.stateService.orderSubject;
  order_id: number | boolean;
  isOrder = false;
  localDate = new Date();

  constructor(
    private stateService: StateService,
    private dialog: MatDialog
    ) { }

  ngOnInit() {
    this.stateService.getAll();
  }

  newOrder() {
    this.order_id = null;
    this.isOrder = true;
  }

  repeatOrder(order: Order): void {
    this.order_id = order.order_id;
    this.isOrder = true;
  }

  toggleIsOrder() {
    this.isOrder ? this.isOrder = false : this.isOrder = true;
  }

  openOverviewDialog(order: Order, isToSubmit: boolean): void {
    this.stateService.getOne(order.order_id);
    this.order$.pipe(
      take(2),
      skip(1)
    ).subscribe(value => {
      const dialogRef = this.dialog.open(OrderOverviewDialogComponent, {
        width: '500px',
        maxHeight: '80vh',
        autoFocus: false,
        data: { order: value, isToSubmit: isToSubmit }
      });
    })
  }


}
