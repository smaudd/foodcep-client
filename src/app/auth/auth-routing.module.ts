import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewAccountComponent } from './new-account/new-account.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserManagerComponent } from './user-manager/user-manager.component';
import { RestaurantProfileComponent } from './restaurant-profile/restaurant-profile.component';
import { AdminGuard } from '../auth/guards/admin.guard';
import { AuthGuard } from '../auth/guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  { path: 'new-account', component: NewAccountComponent, canActivate: [AdminGuard]},
  { path: 'profile', component: UserProfileComponent, canActivate: [AuthGuard]},
  { path: 'manager', component: UserManagerComponent, canActivate: [AdminGuard]},
  { path: 'restaurant', component: RestaurantProfileComponent, canActivate: [AdminGuard]},
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
