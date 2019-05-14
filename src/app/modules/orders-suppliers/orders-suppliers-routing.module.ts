import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrdersSuppliersComponent } from './orders-suppliers.component';
import { OrdersComponent } from './dashboard/orders/orders.component';


const routes: Routes = [
  {
    path: '',
    component: OrdersSuppliersComponent,
  },
  { path: 'order', component: OrdersComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersSuppliersRoutingModule { }
