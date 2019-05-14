import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsManagerComponent } from './products-manager.component';

const routes: Routes = [
  {
    path: '',
    component: ProductsManagerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistreRoutingModule { }
