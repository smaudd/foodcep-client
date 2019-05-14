import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { OrdersSuppliersRoutingModule } from './orders-suppliers-routing.module';

import { OrdersComponent } from './dashboard/orders/orders.component';
import { OrdersSuppliersComponent } from './orders-suppliers.component';
import { SuppliersModule } from './suppliers/suppliers.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OrderOverviewDialogComponent } from './dashboard/orders/order-overview-dialog.component';
import { DeleteSupplierDialogComponent } from './suppliers/components/delete-supplier-dialog.component';

@NgModule({
  declarations: [
    OrdersSuppliersComponent,
    OrdersComponent,
    DashboardComponent,
    OrderOverviewDialogComponent,
    DeleteSupplierDialogComponent
  ],
  imports: [
    OrdersSuppliersRoutingModule,
    SuppliersModule,
    SharedModule,
  ],
  entryComponents: [OrderOverviewDialogComponent, DeleteSupplierDialogComponent]
})
export class OrdersSuppliersModule { }
