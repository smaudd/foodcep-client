import { Component, OnInit, AfterViewInit, AfterContentChecked } from '@angular/core';

import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../auth/models/user.model';
import { Restaurant } from '../../auth/models/restaurant.model';
import { SigninDataService } from '../../http/signin-service/signin-data.service';
import { MatDialog } from '@angular/material';
import { RecaptchaDialogComponent } from '../recaptcha-dialog/recaptcha-dialog.component';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements AfterViewInit {

  isWithCode: boolean;
  user: User;
  errors: number;
  selectedIndex = 0;

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private signinDataService: SigninDataService,
    private dialog: MatDialog,
    private translateService: TranslateService
  ) {}

  ngAfterViewInit(): void {
    let language = this.translateService.getDefaultLang();
    if (language === 'spa') {
      language = 'es'
    }
    // Avoid expression has changed
    setTimeout(() => {
      this.dialog.open(RecaptchaDialogComponent, {
        disableClose: true,
        data: language
      });
    }, 10)
  }

  typeOfSignin(isWithCode: boolean) {
    this.isWithCode = isWithCode;
    this.selectedIndex = 1
  }

  firstStep(userStepData: any) {
    this.user = new User(userStepData.email, userStepData.password, userStepData.name, userStepData.code, userStepData.language, userStepData.currency);
    if (this.isWithCode) {
      this.signinAsEmployee(this.user);
    } else {
      this.selectedIndex = 2;
    }
  }

  signinAsRestaurant(restaurant: Restaurant): void {
    const data: User & Restaurant = {...this.user, ...restaurant};
    this.signinDataService.postRestaurant(data)
    .subscribe(_ => {
      this.redirection()
    },
    error => {
      if (error.status === 409) {
        this.selectedIndex = 1;
        this.errors = error.status;
        // Registered correctly we have the confirmation error
      } else if (error.status === 406) {
        this.redirection()
      }
    })
  }

  signinAsEmployee(user: User): void {
    // In case we got the same error set it to null and it'll execute ngOnChanges() on child component again
    this.errors = null;
    this.selectedIndex = 2;
    this.signinDataService.postUser(user)
    .subscribe(_ => {

    },
    error => {
      this.errors = error.status;
        // Registered correctly we have the confirmation error
      if (error.status === 406) {
      this.redirection()
      }
    })
  }

  redirection() {
    setTimeout(() => {
      this.router.navigate(['/land'])
    }, 3000)
  }
  }


