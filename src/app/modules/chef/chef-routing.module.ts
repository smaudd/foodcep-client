import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserManagerComponent } from './user-manager/user-manager.component';
import { RestaurantProfileComponent } from './restaurant-profile/restaurant-profile.component';
import { AdminGuard } from 'src/app/core/guards/admin.guard';


const routes: Routes = [
  { path: 'team', component: UserManagerComponent, canActivate: [AdminGuard]},
  { path: 'restaurant', component: RestaurantProfileComponent, canActivate: [AdminGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChefRoutingModule { }
