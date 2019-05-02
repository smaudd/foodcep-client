import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { ErrorStateMatcher } from '@angular/material';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Restaurant } from '../../../auth/models/restaurant.model';

@Component({
  selector: 'app-restaurant-form',
  templateUrl: './restaurant-form.component.html'
})
export class RestaurantFormComponent implements OnInit {

    @Output() stepDone = new EventEmitter();
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

    createRestaurant(formValue: any): void {
      const restaurant = new Restaurant(formValue.restaurantName, formValue.description, formValue.adress, formValue.phone);
      this.stepDone.emit(restaurant);
  }

}
