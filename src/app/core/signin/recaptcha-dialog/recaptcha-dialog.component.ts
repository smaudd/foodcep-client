import { Component, Inject, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { RecaptchaService } from '../../http/auth-service/captcha.service';

@Component({
  selector: 'app-recaptcha-dialog',
  template: `
  <div fxLayout="column" align="center">
    <h1><span translate>RECAPTCHA.GREAT</span></h1>
    <p translate>RECAPTCHA.BUT-FIRST</p>

    <div id="element" data-size="compact"></div>

    <br>
    <button mat-button routerLink="/land" (click)="dialogRef.close()">
      <span translate>RECAPTCHA.BACK</span>
    </button>

  </div>
  `
})

export class RecaptchaDialogComponent implements AfterViewInit {

  private _reCaptchaId: number;
  private SITE_ID = ['6LccZaMUAAAAAHC0IpDIOJJln8DMBTn61o--BPYb'];
  captchaSuccess = false;
  token: string;
  grecaptcha = (window as any).grecaptcha;

constructor(
  public dialogRef: MatDialogRef<RecaptchaDialogComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any,
  private recaptchaService: RecaptchaService
  ) {}

  ngAfterViewInit() {
    if (this.grecaptcha) {
      this._reCaptchaId = this.grecaptcha.render('element', {
        'sitekey': this.SITE_ID,
        'callback': (response) => this.reCapchaSuccess(response),
        'hl': this.data
      });
    }
  }

  reCapchaSuccess(token) {
    this.recaptchaService.captchaVerification({ token: token })
    .subscribe(response => {
      this.dialogRef.close();
    })
  }


}
