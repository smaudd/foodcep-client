import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AuthRoutingModule } from '../auth-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { NameComponent } from './name.component';
import { RoleComponent } from './role.component';
import { EmailComponent } from './email.component';
import { LanguageComponent } from './language.component';
import { ChangePwdDialogComponent } from './change-pwd-dialog/change-pwd-dialog.component';
import { DeleteAccountDialogComponent } from './delete-account-dialog/delete-account-dialog.component';


@NgModule({
  declarations: [
    NameComponent,
    RoleComponent,
    EmailComponent,
    LanguageComponent,
    ChangePwdDialogComponent,
    DeleteAccountDialogComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    HttpClientModule,
    SharedModule,
  ],
  exports: [
    NameComponent,
    EmailComponent,
    RoleComponent,
    LanguageComponent,
    ChangePwdDialogComponent,
    DeleteAccountDialogComponent
  ],
  entryComponents: [ChangePwdDialogComponent, DeleteAccountDialogComponent]
})
export class ProfileInputModule { }
