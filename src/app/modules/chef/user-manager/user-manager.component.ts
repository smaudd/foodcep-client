import { Component, OnInit } from '@angular/core';
import { StateService } from './state.service';
import { IUserChange } from './user-change.interface';
import { MatDialog } from '@angular/material';
import { DropUserDialogComponent } from './drop-user-dialog.component';
import { skip } from 'rxjs/operators';
import { fader } from 'src/app/animations/navigation-animations';
import { TranslateService } from '@ngx-translate/core';
import { HelpDialogComponent } from 'src/app/core/layout/help-dialog/help-dialog.component';


@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrls: ['./user-manager.component.css'],
  animations: [fader]
})

export class UserManagerComponent implements OnInit {

  // Subject for the list of users
  usersSubject$ = this.stateService.usersSubject;
  loadingSubject$ = this.stateService.loadingSubject;
  profile = false;
  lang = this.translateService.getDefaultLang();
  src = `assets/documentation/i18n/${this.lang}/manuals/user-manager.md`;

  constructor(
    private stateService: StateService,
    private dialog: MatDialog,
    private translateService: TranslateService
  ) {}

  ngOnInit() {
    // Getting the list of users
    this.stateService.getUsers();
    this.usersSubject$.pipe(skip(1)).subscribe();
  }

  roleChange(user_id: number, role: string) {
    const user: IUserChange = {
      role: role,
      user_id: user_id
    }
    this.stateService.updateUser(user)
  }

  openDropDialog(user_id: number): void {
    const dialogEditRef = this.dialog.open(DropUserDialogComponent, {
      width: '550px',
      data: user_id
    });
  }

  openHelp() {
    this.dialog.open(HelpDialogComponent, { data: 'rnt.md', height: '90vh' })
  }
}
