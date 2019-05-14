import { Component, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { StateService } from '../state.service';
import { Order } from '../models/order.model';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-order-overview-dialog',
  template: `
        <div>
            <div>
                    <div fxFlex="90">
                        <h4 mat-line style="text-align: center">
                          <span translate>ORDERS.CHECKOUT</span>
                        </h4>
                    </div>
                    <div fxFlex="10">
                        <button mat-icon-button (click)="close()" color="primary">
                          <mat-icon>clear</mat-icon>
                        </button>
                    </div>
            </div>
            <h4 mat-line *ngIf="data.isToSubmit; else isDetails" fxLayoutAlign="end">{{ data.order.supplier.name }} @ {{ localDate | date:'d/MM/yy' }} </h4>
            <ng-template #isDetails>
              <h4 mat-line fxLayoutAlign="end">{{ data.order.supplier }} @ {{ data.order.date | date:'d/MM/yy' }} </h4>
            </ng-template>
            <ul *ngFor="let item of data.order.items" style="list-style: none">
                <li fxLayout="row">
                  <p fxFlex="80">{{ item.name }}</p>
                  <p fxFlex="20">{{ item.quantity }}{{ item.unit }}</p>
                </li>
            </ul>
            <div *ngIf="data.isToSubmit" align="end" fxLayout="column">
              <div fxFlex="33.3">
                  <button mat-button color="primary" (click)="submitOrder('whatsapp')">
                    <span translate>ORDERS.WHATSAPP</span>
                    <mat-icon>chat</mat-icon>
                  </button>
              </div>
              <div fxFlex="33.3">
                  <button mat-button color="warn" (click)="submitOrder('gmail')">
                    <span translate>ORDERS.GMAIL</span>
                    <mat-icon>email</mat-icon>
                  </button>
              </div>
              <div fxFlex="33.3">
                  <button mat-button (click)="submitOrder('none')">
                    <span translate>ORDERS.JUST-SAVE</span>
                    <mat-icon>save</mat-icon>
                  </button>
              </div>
            </div>
        </div>

  `
})
export class OrderOverviewDialogComponent implements OnDestroy {


  localDate = new Date();
  subscription: Subscription = null;
  constructor(
    public dialogRef: MatDialogRef<OrderOverviewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private dashboardStateService: StateService,
    ) {}

    close() {
      this.dialogRef.close(false);
    }

    submitOrder(sendUsing: string) {
    const order = new Order(this.data.order.supplier.supplier_id, this.data.order.items, null, null, null);
    this.encodeUrl(order, sendUsing);
    this.dashboardStateService.post(order);
    this.dialogRef.close(true);
    }

    encodeUrl(order: any, sendUsing: string) {
      // Get the supplier data to make the order
      // Restaurant name to use as subject
      const restaurant = localStorage.getItem('Restaurant')
      const subject = `New order from restaurant ${restaurant}`
      let body = order.items.map(item => {
        return item = `${item.name} --> ${item.quantity}${item.unit}`
      })
      this.redirect(subject, body, sendUsing)
    }

    redirect(subject: string, body, redirectTo: string) {

          if (redirectTo === 'whatsapp') {
            // whatsapp
            body = [subject, ...body];
            const encoded = body.join('%0D%0A')
            window.open(`https://wa.me/${this.data.order.supplier.phone}?text=${encoded}`, '_blank')
          } else if (redirectTo === 'gmail') {
            // gmail
            const encoded = body.join('%0D%0A')
            window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${this.data.order.supplier.email}&su=${subject}&body=${encoded}`, '_blank')
          }

    }

    ngOnDestroy(): void {
      this.data = null;
      if (this.subscription !== null) { this.subscription.unsubscribe(); }
    }
}
