import { Component, Input, OnChanges, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ChangePwdDialogComponent } from '../profile-input-components/change-pwd-dialog/change-pwd-dialog.component';
import { DeleteAccountDialogComponent } from '../profile-input-components/delete-account-dialog/delete-account-dialog.component';
import { StateService } from '../profile-input-components/state.service';
import { User } from '../models/user.model';
import { IDialogData } from '../models/input.interfaces';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnChanges, OnDestroy {

  @Input() isAdmin: boolean;
  user$ = this.stateService.user;
  loadingSubject$ = this.stateService.loadingSubject;
  user: User = new User('loading', 'loading', 'loading', 'loading', 'loading', 'loading');
  subscription: Subscription;

  constructor(
    private stateService: StateService,
    public dialog: MatDialog,
    private router: Router
    ) {
      this.router.events
      .pipe(take(1))
      .subscribe(_ => {
        this.customInit();
      });
    }

  ngOnChanges() {
    this.subscription = this.user$
    .subscribe((value: User) => {
      this.user = value;
    });
  }

  customInit() {
    if (this.isAdmin === undefined) {
      // Get the actual logged user profile
      this.stateService.get();
    }
    this.subscription = this.user$
    .subscribe((value: User) => {
      this.user = value;
    });
  }

  dataForDialog(): IDialogData {
    const data = {
      isAdmin: this.isAdmin,
      email: this.user.email
    };
    return data;
  }

  openPwdDialog(): void {
    console.log(this.dataForDialog());
    const dialogRef = this.dialog.open(ChangePwdDialogComponent, {
      width: '500px',
      data: this.dataForDialog()
    });
  }

  openDelDialog(): void {
    const dialogRef = this.dialog.open(DeleteAccountDialogComponent, {
      width: '400px',
      data: this.dataForDialog()
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
