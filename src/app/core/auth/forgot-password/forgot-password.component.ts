import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ForgotPasswordService } from '../../http/auth-service/forgot-password.service';
import { Router } from '@angular/router';
import { trigger, transition, useAnimation } from '@angular/animations';
import { fadeInOut } from 'src/app/animations/navigation-animations';
import { TranslateService } from '@ngx-translate/core';

interface IForgotPassword {
  token: string;
  redirection: string;
}

@Component({
  selector: 'app-forgot',
  template: `
  <div align="center" class="container">
    <h1>
      <span translate>FORGOT.FORGOT?</span>
    </h1>
    <mat-card>
    <div *ngIf="!isEmailSended; else done">
    <p translate>FORGOT.INTRODUCE-EMAIL</p>
      <div class="input-box" fxLayout="column" fxLayoutAlign="left">
        <mat-form-field appearance="outline">
          <input matInput placeholder="{{ 'HOME.EMAIL' | translate }}" [formControl]="email" autocomplete="off">
          <mat-error *ngIf="email.hasError('email')"><span translate>FORGOT.VALID-EMAIL</span></mat-error>
        </mat-form-field>
        <div id="element" data-size="compact"></div>
      </div>
      <div align="end">
      <button mat-button (click)="sendEmail(email.value)" [disabled]="!captchaSuccess || email.invalid">
          <span translate>FORGOT.SEND</span>
      </button>
      </div>
    </div>
    <ng-template #done>
    <p translate>FORGOT.CORRECTLY-SENT</p>
    <p translate>FORGOT.REDIRECTION</p>
    </ng-template>
    </mat-card>
  </div>
  `,
  styleUrls: ['./forgot.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition('* <=> void', [useAnimation(fadeInOut, { params: { time: '.5s' } })])
    ])
  ]
})
export class ForgotPasswordComponent implements OnInit {

  email = new FormControl('', [Validators.required, Validators.email, Validators.maxLength(30)]);
  isEmailSended = false;
  private _reCaptchaId: number;
  private SITE_ID = ['6LccZaMUAAAAAHC0IpDIOJJln8DMBTn61o--BPYb'];
  captchaSuccess = false;
  token: string;
  grecaptcha = (window as any).grecaptcha;

  constructor(
    private forgotPasswordService: ForgotPasswordService,
    private router: Router,
    private translateService: TranslateService
    ) {
  }

  ngOnInit() {}

  ngAfterViewInit() {
    let language =  this.translateService.getDefaultLang();
    if (language === 'spa') {
      language = 'es';
    }
    if (this.grecaptcha) {
      this._reCaptchaId = this.grecaptcha.render('element', {
        'sitekey': this.SITE_ID,
        'callback': (response) => this.reCapchaSuccess(response),
        'hl': language
      });
    }
  }

  reCapchaSuccess(data:any){
    if(data){
      this.token = data;
      this.captchaSuccess = true;
    }
  }

  sendEmail(email: string): void {
    const forgot: IForgotPassword = {
      token: this.token,
      redirection: `../forgot-password?email=${email}`
    }
    this.forgotPasswordService.captchaVerification(forgot)
    .subscribe(res => {
      this.isEmailSended = true;
      this.redirect();
    },
    // In case of errors just do the same to mock the user
    err => {
      this.isEmailSended = true;
      this.redirect();
    })
  }

  redirect() {
    setTimeout(() => {
      this.router.navigate(['/land']);
    }, 5000)
  }

}
