import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DishesManagerComponent } from './dishes-manager.component';

const routes: Routes = [
  {
    path: '',
    component: DishesManagerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DishRoutingModule { }
