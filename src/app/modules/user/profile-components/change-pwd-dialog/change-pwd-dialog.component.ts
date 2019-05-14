import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/http/auth-service/auth.service';
import { StateService } from '../state.service';
import { IDialogData, IPasswordChange } from '../../../../core/auth/models/input.interfaces';
import { skip, take } from 'rxjs/operators';

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
  errors$ = this.stateService.errorsSubject;

  constructor(
    public dialogRef: MatDialogRef<ChangePwdDialogComponent>,
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
    this.stateService.updatePassword(userData);
    this.errorHandler();
  }

  errorHandler() {
    // Handles repeated emails and wrong passwords
    this.errors$.pipe(
      take(2),
      skip(1)
    )
    .subscribe(error => {
        if (error === 422) {
            this.form.get('currentPassword').setErrors({ 'wrong-password': 'error' });
            } else {
              this.form.reset();
              this.done = true;
              this.doLogout();
            }
    })
  }

  doLogout() {
      setTimeout(() => {
        this.authService.logout().subscribe();
        this.dialogRef.close();
      }, 3000);
  }
}
