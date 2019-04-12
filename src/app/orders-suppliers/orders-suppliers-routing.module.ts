import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminGuard } from '../auth/guards/admin.guard';
import { AuthGuard } from '../auth/guards/auth.guard';
import { OrdersSuppliersComponent } from './orders-suppliers.component';
import { OrdersComponent } from './orders/orders.component';


const routes: Routes = [
  {
    path: '',
    component: OrdersSuppliersComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: '/orders',
    component: OrdersComponent,
    // canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersSuppliersRoutingModule { }
