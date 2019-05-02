import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../../material.module';
import { SharedModule } from '../../modules/shared/shared.module'

import { AuthRoutingModule } from './auth-routing.module';

import { LoginComponent } from './login/login.component';
import { CommonModule } from '@angular/common';
import { VerificationDialogComponent } from './login/verification-dialog.component';

@NgModule({
  declarations: [
    LoginComponent,
    VerificationDialogComponent
  ],
  imports: [
    MaterialModule,
    SharedModule,
    CommonModule,
    AuthRoutingModule,
    HttpClientModule
  ],
  exports: [
    LoginComponent
  ],
  entryComponents: [ VerificationDialogComponent ]
})
export class AuthModule { }
