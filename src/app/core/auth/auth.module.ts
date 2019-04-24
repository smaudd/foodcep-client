import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../../material.module';
import { SharedModule } from '../../modules/shared/shared.module'

import { AuthRoutingModule } from './auth-routing.module';

import { LoginComponent } from './login/login.component';
import { CommonModule } from '@angular/common';
import { NewAccountComponent } from './new-account/new-account.component';


@NgModule({
  declarations: [
    LoginComponent,
    NewAccountComponent,
  ],
  imports: [
    MaterialModule,
    SharedModule,
    CommonModule,
    AuthRoutingModule,
    HttpClientModule
  ],
})
export class AuthModule { }
