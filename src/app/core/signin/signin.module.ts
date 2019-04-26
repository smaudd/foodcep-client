import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SigninComponent } from './signin/signin.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { SigninRestaurantComponent } from './signin/signin-restaurant/signin-restaurant.component';

@NgModule({
  declarations: [SigninComponent, SigninRestaurantComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [ SigninComponent ]
})
export class SigninModule { }
