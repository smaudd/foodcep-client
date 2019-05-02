import { Component, OnInit } from '@angular/core';

import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { trigger, transition, useAnimation } from '@angular/animations';
import { fadeInOut } from 'src/app/animations/navigation-animations';
import { User } from '../../auth/models/user.model';
import { Restaurant } from '../../auth/models/restaurant.model';
import { SigninDataService } from '../../http/signin-service/signin-data.service';
import { AuthService } from '../../http/auth-service/auth.service';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition('void => *', [useAnimation(fadeInOut, { params: { time: '1s' } })])
    ])
  ]
})
export class SigninComponent implements OnInit {

    constructor(public fb: FormBuilder, private router: Router, private signinDataService: SigninDataService, private authService: AuthService) {
    }

    isWithCode: boolean;
    user: User;
    errors: number;
    selectedIndex = 0;

    ngOnInit() {}

    typeOfSignin(isWithCode: boolean) {
      this.isWithCode = isWithCode;
      this.selectedIndex = 1
    }

    firstStep(userStepData: any) {
      this.user = new User(userStepData.email, userStepData.password, userStepData.name, userStepData.code, userStepData.language);
      if (this.isWithCode) {
        this.signinAsEmployee(this.user);
      } else {
        this.selectedIndex = 2;
      }
    }

    signinAsRestaurant(restaurant: Restaurant): void {
      const data: User & Restaurant = {...this.user, ...restaurant};
      this.signinDataService.postRestaurant(data)
      .subscribe(_ => {},
      error => {

        this.errors = error.status;
      })
    }
    signinAsEmployee(user: User): void {
      // In case we got the same error set it to null and it'll execute ngOnChanges() on child component again
      this.errors = null;
      this.signinDataService.postUser(user)
      .subscribe(_ => {},
      error => {
        this.errors = error.status;
      })
    }
  }


