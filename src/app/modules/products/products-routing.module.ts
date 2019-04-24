import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsManagerComponent } from './products-manager.component';
import { AdminGuard } from '../../core/guards/admin.guard';

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
export class RegistreRoutingModule { }
