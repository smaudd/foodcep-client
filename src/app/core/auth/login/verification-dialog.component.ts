import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ResendVerificationService } from '../../http/auth-service/resend-verification.service';

@Component({
  selector: 'app-verification-dialog',
  template: `
  <div fxLayout="column" align="center" *ngIf="!isResended; else resend">
    <h1>Welcome to foodcep!</h1>
    <p>We are happy to have you here!</p>
    <p>But first you need to validate your email to use your account</p>
    <p>We sended you an email with the verification link. Just go there and you'll be able to login</p>
    <small>You didn't recieve the email?</small>
    <br>
    <div align="center">
      <button mat-button (click)="resendEmail()">
        <span>Resend</span>
      </button>
    </div>
  </div>
  <ng-template #resend>
    <div align="center">
      <h3>The verification email was resended to your account!</h3>
      <p>Go to your email and verify it!</p>
    </div>
  </ng-template>
  `
})

export class VerificationDialogComponent {

  isResended = false;

constructor(
  public dialogRef: MatDialogRef<VerificationDialogComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any,
  private resendVerificationService: ResendVerificationService
  ) {}

  resendEmail() {
    this.resendVerificationService.resend(this.data.user_id)
    .subscribe(_ => {
      this.isResended = true;
      setTimeout(() => {
        this.dialogRef.close();
      }, 2000)
    })
  }


}
