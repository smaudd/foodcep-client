import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { ErrorStateMatcher } from '@angular/material';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-signin-restaurant',
  templateUrl: './signin-restaurant.component.html'
})
export class SigninRestaurantComponent implements OnInit {

    @Output() restaurantData = new EventEmitter();
    matcher = new ErrorStateMatcher;
    restaurantForm: FormGroup;

    get restaurantName() {
      return this.restaurantForm.get('restaurantName');
    }

    get adress() {
      return this.restaurantForm.get('adress');
    }

    get phone() {
      return this.restaurantForm.get('phone');
    }

    get description() {
      return this.restaurantForm.get('description');
    }

    constructor(public fb: FormBuilder) {
    }

    ngOnInit() {
        this.restaurantForm = this.fb.group({
          restaurantName: new FormControl('', [Validators.required, Validators.maxLength(30)]),
          adress: new FormControl('', [Validators.required, Validators.maxLength(30)]),
          phone: new FormControl('', [Validators.required, Validators.pattern('^([0-9]){8,}'), Validators.maxLength(20)]),
          description: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      });
    }

    sendRestaurantData(formValue: any): void {
      this.restaurantData.emit(formValue);
  }

}
