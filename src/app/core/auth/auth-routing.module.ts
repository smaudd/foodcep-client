import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewAccountComponent } from './new-account/new-account.component';
import { AdminGuard } from '../guards/admin.guard';
import { LoginComponent } from './login/login.component';
import { LoginGuard } from '../guards/login.guard';

const routes: Routes = [
  { path: 'new-account', component: NewAccountComponent, canActivate: [AdminGuard]},
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
