import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { StateService } from '../state.service';
import { IDialogData, IPasswordChange } from '../../models/input.interfaces';
import { ValidPasswordService } from '../valid-password.service';

@Component({
  selector: 'app-change-pwd-dialog',
  templateUrl: './change-pwd-dialog.component.html',
  styleUrls: ['./change-pwd-dialog.component.css']
})
export class ChangePwdDialogComponent implements OnInit {

  get currentPassword() {
    return this.form.get('currentPassword');
  }

  get newPassword() {
    return this.form.get('newPassword');
  }

  get confirmPassword() {
    return this.form.get('confirmPassword');
  }
  form: FormGroup;
  // Used for flag to display the after changes view
  done = false;

  constructor(
    public dialogRef: MatDialogRef<ChangePwdDialogComponent>,
    private validPassword: ValidPasswordService,
    @Inject(MAT_DIALOG_DATA) public data: IDialogData,
    public fb: FormBuilder,
    private authService: AuthService,
    private stateService: StateService
    ) {}

  ngOnInit() {
    this.form = this.fb.group({
      currentPassword: new FormControl('', [Validators.required]),
      newPassword: new FormControl('', [Validators.required, Validators.pattern('^(?=.*?[a-z])(?=.*?[0-9]).{8,}$')]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(2)]),
    });
    this.matchingPasswordsOnChanges();
    if (this.data.isAdmin) {
      this.form.get('currentPassword').setValidators([]);
    }
  }

  matchingPasswordsOnChanges() {
    // Matching new password and confirm password
      this.form.get('confirmPassword').valueChanges.subscribe(_ => {
        const pwd = this.form.get('newPassword').value;
        this.form.get('confirmPassword').setValidators([Validators.required, Validators.pattern(pwd)]);
      });
  }

  savePwd(formValues: any) {
    const userData: IPasswordChange = {
      email: this.data.email,
      currentPassword: formValues.currentPassword,
      newPassword: formValues.newPassword
    };
    // Checks for admin or user actions
    if (this.data.isAdmin === true) {
      this.stateService.changePassword(userData, 'api/admin/changePassword');
      this.dialogRef.close();
    } else {
      this.userActions(userData);
    }
  }

  userActions(userData: IPasswordChange) {
      this.validPassword.checkPassword(userData)
      .subscribe(_ => {
        // Password valid, proceed to the password change
        this.stateService.changePassword(userData, 'api/user/changePassword');
        this.done = true;
        this.doLogout();
      }, _ => {
        // Wrong password for status code 422
        // Ignore the previous validators
        this.form.get('currentPassword').setValidators([]);
        // Set the validator as invalid
        this.form.get('currentPassword').setErrors({ incorrect: true });
      });
  }

  doLogout() {
      setTimeout(() => {
        this.authService.logout().subscribe();
        this.dialogRef.close();
      }, 3000);
  }
}
