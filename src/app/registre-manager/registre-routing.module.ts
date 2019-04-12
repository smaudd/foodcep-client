import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistreManagerComponent } from './registre-manager.component';
import { AdminGuard } from '../auth/guards/admin.guard';

const routes: Routes = [
  {
    path: '',
    component: RegistreManagerComponent,
    canActivate: [AdminGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistreRoutingModule { }
