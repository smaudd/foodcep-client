import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SigninComponent } from './signin/signin.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { RestaurantFormComponent } from './signin/restaurant-form/restaurant-form.component';
import { SigninRoutingModule } from './signin-routing.module';
import { UserFormComponent } from './signin/user-form/user-form.component';
import { RecaptchaDialogComponent } from './recaptcha-dialog/recaptcha-dialog.component';

@NgModule({
  declarations: [SigninComponent, RestaurantFormComponent, UserFormComponent, RecaptchaDialogComponent],
  imports: [
    SigninRoutingModule,
    CommonModule,
    SharedModule
  ],
  exports: [ SigninComponent ],
  entryComponents: [ RecaptchaDialogComponent ]
})
export class SigninModule { }
