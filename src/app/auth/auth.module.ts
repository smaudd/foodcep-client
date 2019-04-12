import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../material.module';

import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ProfileInputModule } from './profile-input-components/profile-input.module';

import { LoginComponent } from './login/login.component';
import { CommonModule } from '@angular/common';
import { NewAccountComponent } from './new-account/new-account.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserManagerComponent } from './user-manager/user-manager.component';
import { RestaurantProfileComponent } from './restaurant-profile/restaurant-profile.component';

@NgModule({
  declarations: [
    LoginComponent,
    NewAccountComponent,
    UserProfileComponent,
    UserManagerComponent,
    RestaurantProfileComponent
  ],
  imports: [
    MaterialModule,
    CommonModule,
    AuthRoutingModule,
    HttpClientModule,
    SharedModule,
    ProfileInputModule
  ],
})
export class AuthModule { }
