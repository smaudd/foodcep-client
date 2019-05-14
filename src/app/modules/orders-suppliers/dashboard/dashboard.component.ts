import { Component, OnInit, Input, Output, EventEmitter, OnChanges, OnDestroy } from '@angular/core';
import { StateService } from './state.service';
import { Order } from './models/order.model';
import { MatDialog } from '@angular/material';
import { OrderOverviewDialogComponent } from './orders/order-overview-dialog.component';
import { skip, take } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { fader } from 'src/app/animations/navigation-animations';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [fader]

})
export class DashboardComponent implements OnInit {

  orders$ = this.stateService.ordersSubject;
  order$ = this.stateService.orderSubject;
  localDate = new Date();
  lang = this.translateService.getDefaultLang();
  src = `assets/documentation/i18n/${this.lang}/manuals/orders.md`

  constructor(
    private stateService: StateService,
    private dialog: MatDialog,
    private translateService: TranslateService
    ) { }

  ngOnInit() {
    this.stateService.getAll();
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
