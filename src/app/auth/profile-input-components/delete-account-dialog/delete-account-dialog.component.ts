import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AuthService } from '../../services/auth.service';
import { FormControl } from '@angular/forms';
import { IDialogData, IDelete } from '../../models/input.interfaces';
import { StateService } from '../state.service';
import { ValidPasswordService } from '../valid-password.service';

@Component({
  selector: 'app-delete-account-dialog',
  templateUrl: './delete-account-dialog.component.html',
  styleUrls: ['./delete-account-dialog.component.css']
})
export class DeleteAccountDialogComponent implements OnInit {

  password = new FormControl;
  done = false;

  constructor(
    public dialogRef: MatDialogRef<DeleteAccountDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IDialogData,
    private stateService: StateService,
    private authService: AuthService,
    private validPasswordService: ValidPasswordService,
    ) { }

  ngOnInit() {
  }

  deleteAccount(password?: string) {
      const userData: IDelete = { email: this.data.email, currentPassword: password };
      console.log(userData);
      if (this.data.isAdmin) {
        this.stateService.deleteAccount(userData, 'api/user/deleteAccount');
        this.dialogRef.close();
      } else {
        this.userActions(userData);
      }
  }

  userActions(userData: IDelete) {
    this.validPasswordService.checkPassword(userData).subscribe(value => {
      this.stateService.deleteAccount(userData, 'api/user/deleteAccount');
      this.done = true;
      this.doLogout();
    }, _ => {
      // Wrong password for status code 422
      // Ignore the previous validators
      this.password.setValidators([]);
      // Set the validator as invalid
      this.password.setErrors({ incorrect: true });
    });
  }

  doLogout() {
    setTimeout(() => {
      this.authService.logout().subscribe();
      this.dialogRef.close();
    }, 3000);
  }
}
