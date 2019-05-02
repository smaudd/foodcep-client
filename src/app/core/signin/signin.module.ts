import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SigninComponent } from './signin/signin.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { RestaurantFormComponent } from './signin/restaurant-form/restaurant-form.component';
import { SigninRoutingModule } from './signin-routing.module';
import { UserFormComponent } from './signin/user-form/user-form.component';

@NgModule({
  declarations: [SigninComponent, RestaurantFormComponent, UserFormComponent],
  imports: [
    SigninRoutingModule,
    CommonModule,
    SharedModule
  ],
  exports: [ SigninComponent ]
})
export class SigninModule { }
