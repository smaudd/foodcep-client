import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrdersSuppliersComponent } from './orders-suppliers.component';


const routes: Routes = [
  {
    path: '',
    component: OrdersSuppliersComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersSuppliersRoutingModule { }
