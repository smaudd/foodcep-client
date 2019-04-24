import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminGuard } from '../../core/guards/admin.guard';
import { ProductsManagerComponent } from '../products/products-manager.component';

const routes: Routes = [
  {
    path: '',
    component: ProductsManagerComponent,
    canActivate: [AdminGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
