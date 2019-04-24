import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../../material.module';
import { SharedModule } from '../../modules/shared/shared.module'

import { ChefRoutingModule } from './chef-routing.module';

import { CommonModule } from '@angular/common';

import { UserManagerComponent } from './user-manager/user-manager.component';
import { RestaurantProfileComponent } from './restaurant-profile/restaurant-profile.component';

@NgModule({
  declarations: [
    UserManagerComponent,
    RestaurantProfileComponent
  ],
  imports: [
    MaterialModule,
    SharedModule,
    CommonModule,
    ChefRoutingModule,
    HttpClientModule
  ],
})
export class ChefModule { }
