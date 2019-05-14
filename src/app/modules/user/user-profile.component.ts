import { Component, OnDestroy, Output, EventEmitter, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ChangePwdDialogComponent } from './profile-components/change-pwd-dialog/change-pwd-dialog.component';
import { DeleteAccountDialogComponent } from './profile-components/delete-account-dialog/delete-account-dialog.component';
import { StateService } from './profile-components/state.service';
import { User } from '../../core/auth/models/user.model';
import { Subscription } from 'rxjs';
import { trigger, transition, useAnimation } from '@angular/animations';
import { slide, fadeInOut } from '../../animations/navigation-animations';
import { IDialogData } from '../../core/auth/models/input.interfaces';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition('* <=> void', [useAnimation(fadeInOut, { params: { time: '.5s' } })])
    ])
  ]
})
export class UserProfileComponent implements OnInit, OnDestroy {

  @Output() close = new EventEmitter;
  user$ = this.stateService.user;
  loadingSubject$ = this.stateService.loadingSubject;
  user: User = new User('loading', 'loading', 'loading', 'loading', 'loading', 'loading');
  subscription: Subscription;

  constructor(
    private stateService: StateService,
    public dialog: MatDialog
    ) {}

  ngOnInit() {
    this.stateService.getUser();
    this.subscription = this.user$
    .subscribe((value: User) => {
      this.user = value;
    });
  }

  openPwdDialog(): void {
    const dialogRef = this.dialog.open(ChangePwdDialogComponent, {
      width: '500px',
      data: this.user
    });
  }

  openDelDialog(): void {
    const dialogData = {
      email: this.user.email,
    }
    const dialogRef = this.dialog.open(DeleteAccountDialogComponent, {
      width: '400px',
      data: dialogData
    });
  }

  closeProfile() {
    this.close.emit(true);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
