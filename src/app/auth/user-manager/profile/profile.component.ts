import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { User } from '../../models/user.model';
import { ChangePwdDialogComponent } from '../../profile-input-components/change-pwd-dialog/change-pwd-dialog.component';
import { DeleteAccountDialogComponent } from '../../profile-input-components/delete-account-dialog/delete-account-dialog.component';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
  })
export class ProfileComponent {

    _user: User;
    get user() {
      return this._user;
    }
    set user(value: User) {
      this._user = value;
    }
    constructor(private dialog: MatDialog) {}

    openPwdDialog(): void {
      const dialogRef = this.dialog.open(ChangePwdDialogComponent, {
        width: '500px',
        height: '310px',
        data: this.user
      });

      dialogRef.afterClosed().subscribe(result => {
          if (result) {
            // this.snackBar.open(`${this.loadedUser.name}'s password successfully changed`, null, 'green-snackbar', 2000);
        }
      }, error => {
        // this.snackBar.open(`We had some problems changing ${this.loadedUser.name}'s password`, null, 'danger-snackbar', 3000);
      });
    }

  openDelDialog(): void {
    const dialogRef = this.dialog.open(DeleteAccountDialogComponent, {
      width: '400px',
      height: '175px',
      data: this.user
    });

    dialogRef.afterClosed().subscribe(result => {
      // if (result._id === this.loadedUser._id) {
      //   this.snackBar.open('Account successfully deleted!', null, 'green-snackbar', 2000);
      //   const index = this.dataSource.data.indexOf(result);
      //   this.dataSource.data.splice(index, 1);
      //   }
    });
  }
}
