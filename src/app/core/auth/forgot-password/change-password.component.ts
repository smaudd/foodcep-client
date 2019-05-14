import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ForgotPasswordService } from '../../http/auth-service/forgot-password.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  template: `
  <div class="container">
  <div >
    <h3 class="mid-title">
      <span translate>FORGOT.CHANGE</span>
    </h3>
      <mat-card>
        <div *ngIf="!notFound; else error">
            <form [formGroup]="form" fxLayout="column" (ngSubmit)="changePwd(form.value)">
              <mat-form-field appearance="outline">
                <input matInput type="password" formControlName="newPassword" placeholder="{{ 'AUTH.NEW-PWD' | translate }}">
                <mat-error *ngIf="newPassword.hasError('required')"><span translate>AUTH.NEW-PWD-REQUIRED</span></mat-error>
                <mat-error *ngIf="newPassword.hasError('pattern')"><span translate>AUTH.PWD-REQ</span></mat-error>
              </mat-form-field>

              <mat-form-field appearance="outline">
                  <input matInput type="password" formControlName="confirmPassword" placeholder="{{ 'AUTH.REPEAT-PWD' | translate }}">
                  <mat-error *ngIf="confirmPassword.hasError('required')"><a translate>AUTH.REPEAT-PWD</a></mat-error>
                  <mat-error *ngIf="confirmPassword.hasError('pattern')"><a translate>AUTH.NOT-MATCH</a></mat-error>
              </mat-form-field>

              <div align="end">
                <button mat-button type="submit" [disabled]="form.invalid">
                  <span translate>FORGOT.SUBMIT</span>
                </button>
              </div>
            </form>
            <div *ngIf="done">
              <p translate>FORGOT.ANOTHER-LINK</p>
            </div>
        </div>
        <ng-template #error>
        <p translate>FORGOT.REQ-NOT-FOUND</p>
        <p translate>FORGOT.REDIRECTION</p>
      </ng-template>
      </mat-card>
  </div>
  `,
})
export class ChangePasswordComponent implements OnInit {

  get newPassword() {
    return this.form.get('newPassword');
  }

  get confirmPassword() {
    return this.form.get('confirmPassword');
  }
  form: FormGroup;
  code: string;
  notFound = false;
  done = false;
  constructor(
    private forgotPasswordService: ForgotPasswordService,
    public fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
    ) {

  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params.code === undefined) {
        this.router.navigate(['/'])
      }
      this.code = params.code;
    })
    this.form = this.fb.group({
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

  changePwd(formValues: any) {
    const data = {
      newPassword: formValues.newPassword,
      code: this.code
    }
    this.forgotPasswordService.changePassword(data)
    .subscribe(response => {
      this.done = true;
      setTimeout(() => {
        this.router.navigate(['/land']);
      }, 5000)
    }, err => {
      this.notFound = true;
      setTimeout(() => {
        this.router.navigate(['/land']);
      }, 5000)
    })
  }

}


