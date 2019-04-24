import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { UserRoutingModule } from './user-routing.module';
import { SharedModule } from '../shared/shared.module';
import { UserProfileComponent } from '../../modules/user/user-profile.component';
import { CommonModule } from '@angular/common';
import { NameComponent } from './profile-components/name.component';
import { RoleComponent } from './profile-components/role.component';
import { EmailComponent } from './profile-components/email.component';
import { LanguageComponent } from './profile-components/language.component';
import { ChangePwdDialogComponent } from './profile-components/change-pwd-dialog/change-pwd-dialog.component';
import { DeleteAccountDialogComponent } from './profile-components/delete-account-dialog/delete-account-dialog.component';


@NgModule({
  declarations: [
    UserProfileComponent,
    NameComponent,
    RoleComponent,
    EmailComponent,
    LanguageComponent,
    ChangePwdDialogComponent,
    DeleteAccountDialogComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    HttpClientModule,
    SharedModule,
  ],
  exports: [
    UserProfileComponent,
    NameComponent,
    EmailComponent,
    RoleComponent,
    LanguageComponent,
    ChangePwdDialogComponent,
    DeleteAccountDialogComponent
  ],
  entryComponents: [ChangePwdDialogComponent, DeleteAccountDialogComponent]
})
export class UserModule { }
