import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { ErrorStateMatcher } from '@angular/material';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/modules/shared/services/snackbar.service';
import { trigger, transition, useAnimation } from '@angular/animations';
import { slide, fadeInOut } from 'src/app/animations/navigation-animations';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css'],
  animations: [
    trigger('toolbarSlide', [
      transition('* <=> void', [useAnimation(slide, { params: { time: '.25s' } })])
    ]),
    trigger('fadeInOut', [
      transition('* <=> void', [useAnimation(fadeInOut, { params: { time: '1s' } })])
    ])
  ]
})
export class NewAccountComponent implements OnInit {

    passwordValue: any;
    matcher = new ErrorStateMatcher;
    userForm: FormGroup;
    isConfirmed: boolean;

    constructor(public fb: FormBuilder, private router: Router, private snackBar: SnackbarService) {
    }

    ngOnInit() {
        this.userForm = this.fb.group({
          email: new FormControl('', [Validators.required, Validators.email]),
          name: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
          password: new FormControl('', [Validators.required, Validators.pattern('^(?=.*?[a-z])(?=.*?[0-9]).{8,}$')]),
          confirmPassword: new FormControl('', [Validators.required]),
          role: new FormControl('', [Validators.required])
      });

      this.userForm.get('confirmPassword').valueChanges.subscribe(changes => {
        const pwd = this.userForm.get('password').value;
        this.userForm.get('confirmPassword').setValidators(Validators.pattern(pwd));
      });
    }

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

    get role() {
      return this.userForm.get('role');
    }

  //   registerUser(formValue: any): void {
  //     const user = new User(formValue.email, formValue.password, formValue.name, formValue.role);
  //   this.adminService.createUser(user)
  //   .subscribe(response => {
  //     if (response) {
  //       this.snackBar.open('User created!', null, 'green-snackbar', 3000);
  //       this.router.navigate(['/users-manager']);
  //     }
  //   }, error => {
  //     if (error.status === 409) {
  //       this.snackBar.open('Email already registred', null, 'warning-snackbar', 3000);
  //     } else {
  //       this.snackBar.open('Problems creating your user! Try again', null, 'danger-snackbar', 3000);
  //     }
  //   });
  // }

}
