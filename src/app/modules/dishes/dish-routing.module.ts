import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DishesManagerComponent } from './dishes-manager.component';
import { AdminGuard } from '../../core/guards/admin.guard';

const routes: Routes = [
  {
    path: '',
    component: DishesManagerComponent,
    canActivate: [AdminGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DishRoutingModule { }
