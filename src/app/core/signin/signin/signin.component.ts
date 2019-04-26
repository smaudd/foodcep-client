import { Component, OnInit } from '@angular/core';

import { ErrorStateMatcher } from '@angular/material';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { trigger, transition, useAnimation } from '@angular/animations';
import { slide, fadeInOut } from 'src/app/animations/navigation-animations';
import { User } from '../../auth/models/user.model';
import { Restaurant } from '../../auth/models/restaurant.model';
import { SigninDataService } from '../../http/signin-service/signin-data.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
  animations: [
    trigger('toolbarSlide', [
      transition('* <=> void', [useAnimation(slide, { params: { time: '.25s' } })])
    ]),
    trigger('fadeInOut', [
      transition('* <=> void', [useAnimation(fadeInOut, { params: { time: '1s' } })])
    ])
  ]
})
export class SigninComponent implements OnInit {

    get name() {
      return this.userForm.get('name');
    }

    get email() {
      return this.userForm.get('email');
    }

    get password() {
      return this.userForm.get('password');
    }

    get confirmPassword() {
      return this.userForm.get('confirmPassword');
    }

    get type() {
      return this.userForm.get('type');
    }

    get code() {
      return this.userForm.get('code');
    }

    passwordValue: any;
    matcher = new ErrorStateMatcher;
    userForm: FormGroup;
    isConfirmed: boolean;

    constructor(public fb: FormBuilder, private router: Router, private signinDataService: SigninDataService) {
    }

    ngOnInit() {
        this.userForm = this.fb.group({
          email: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(30)]),
          name: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.maxLength(30)]),
          password: new FormControl('', [Validators.required, Validators.pattern('^(?=.*?[a-z])(?=.*?[0-9]).{8,}$'), Validators.maxLength(20)]),
          confirmPassword: new FormControl('', [Validators.required, Validators.maxLength(20)]),
          code: new FormControl('', [Validators.required, Validators.maxLength(128)]),
          type: new FormControl(null, [Validators.required])
      });

      this.userForm.get('confirmPassword').valueChanges.subscribe(changes => {
        // Set validator to match the firts input pwd
        const pwd = this.userForm.get('password').value;
        this.userForm.get('confirmPassword').setValidators(Validators.pattern(pwd));
      });
    }

    registerAsRestaurant(formValue: any, restData: any): void {
      const user: User = new User(formValue.email, formValue.password, formValue.name);
      const restaurant: Restaurant = new Restaurant(restData.restaurantName, restData.adress, restData.phone, restData.description);
      const data: User & Restaurant = {...user, ...restaurant};
      this.signinDataService.postRestaurant(data)
      .subscribe(() => {
        // The server should respond with a session for the new user
        this.router.navigate(['/']);
      }, error => {
        if (error.status === 409) {
          this.userForm.get('email').setErrors( { 'emailRepeated': true })
        }
      })
    }
    registreAsEmployee(formValue: any): void {
      const user: User = new User(formValue.email, formValue.password, formValue.name);
      this.signinDataService.postUser(user)
      .subscribe(() => {
        // The server should respond with a session for the new user
        // this.router.navigate(['/']);
      },
      error => {
        if (error.status === 409) {
          this.userForm.get('email').setErrors( { 'email-repeated': true })
        }
        if (error.status === 422) {
          this.userForm.get('code').setErrors( { 'wrong-invitation': true })
        }
      })
    }
  }


