import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../../material.module';
import { SharedModule } from '../../modules/shared/shared.module'

import { ChefRoutingModule } from './chef-routing.module';

import { CommonModule } from '@angular/common';

import { UserManagerComponent } from './user-manager/user-manager.component';
import { RestaurantProfileComponent } from './restaurant-profile/restaurant-profile.component';
import { DropUserDialogComponent } from './user-manager/drop-user-dialog.component';

@NgModule({
  declarations: [
    UserManagerComponent,
    RestaurantProfileComponent,
    DropUserDialogComponent
  ],
  imports: [
    MaterialModule,
    SharedModule,
    CommonModule,
    ChefRoutingModule,
    HttpClientModule
  ],
  entryComponents: [ DropUserDialogComponent ]
})
export class ChefModule { }
