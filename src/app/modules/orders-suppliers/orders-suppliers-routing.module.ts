import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminGuard } from '../../core/guards/admin.guard';
import { AuthGuard } from '../../core/guards/auth.guard';
import { OrdersSuppliersComponent } from './orders-suppliers.component';


const routes: Routes = [
  {
    path: '',
    component: OrdersSuppliersComponent,
    // canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersSuppliersRoutingModule { }
