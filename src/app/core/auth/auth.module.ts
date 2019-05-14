import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../../material.module';
import { SharedModule } from '../../modules/shared/shared.module';
import { NgxCaptchaModule } from 'ngx-captcha';


import { AuthRoutingModule } from './auth-routing.module';

import { LoginComponent } from './login/login.component';
import { CommonModule } from '@angular/common';
import { VerificationDialogComponent } from './login/verification-dialog.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './forgot-password/change-password.component';
import { WelcomeDialogComponent } from './login/welcome-dialog/welcome-dialog.component';

@NgModule({
  declarations: [
    LoginComponent,
    ForgotPasswordComponent,
    VerificationDialogComponent,
    ChangePasswordComponent,
    WelcomeDialogComponent
  ],
  imports: [
    MaterialModule,
    SharedModule,
    CommonModule,
    AuthRoutingModule,
    HttpClientModule,
    NgxCaptchaModule
  ],
  exports: [
    LoginComponent
  ],
  entryComponents: [ VerificationDialogComponent, WelcomeDialogComponent ]
})
export class AuthModule { }
