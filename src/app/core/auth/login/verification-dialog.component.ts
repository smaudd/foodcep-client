import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ResendVerificationService } from '../../http/auth-service/resend-verification.service';
import { delay, tap } from 'rxjs/operators';

@Component({
  selector: 'app-verification-dialog',
  template: `
  <div fxLayout="column" align="center" *ngIf="!isResended; else resend">
    <h1><span translate>HOME.WELCOME-2</span></h1>
    <p translate>HOME.HAPPY</p>
    <p translate>HOME.BUT</p>
    <p translate>HOME.SENT-EMAIL</p>
    <small translate>HOME.DIDNT</small>
    <br>
    <div align="center">
      <button mat-button (click)="resendEmail()">
        <span translate>HOME.RESEND</span>
      </button>
    </div>
  </div>
  <ng-template #resend>
    <div align="center">
      <h3><span translate>HOME.SENT-2</span></h3>
      <p translate>HOME.GO-TO-EMAIL</p>
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
    .pipe(
      tap(_ => this.isResended = true),
      delay(4000)
    )
    .subscribe(_ => {
      this.dialogRef.close();
    })
  }


}
