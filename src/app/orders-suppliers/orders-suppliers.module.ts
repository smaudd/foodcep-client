import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { OrdersSuppliersRoutingModule } from './orders-suppliers-routing.module';

import { OrdersComponent } from './orders/orders.component';
import { OrdersSuppliersComponent } from './orders-suppliers.component';
import { SuppliersModule } from './suppliers/suppliers.module';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    OrdersSuppliersComponent,
    OrdersComponent,
    DashboardComponent
  ],
  imports: [
    OrdersSuppliersRoutingModule,
    SuppliersModule,
    SharedModule,
  ]
})
export class OrdersSuppliersModule { }
