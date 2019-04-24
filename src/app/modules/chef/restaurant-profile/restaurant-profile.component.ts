import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ChefDataService } from '../../../core/http/chef-data-service/chef-data.service';
import { SnackbarService } from 'src/app/modules/shared/services/snackbar.service';

import { Restaurant } from '../../../core/auth/models/restaurant.model';
import { AuthService } from '../../../core/http/auth-service/auth.service';
import { trigger, transition, useAnimation } from '@angular/animations';
import { slide, fadeInOut } from 'src/app/animations/navigation-animations';

@Component({
  selector: 'app-restaurant-profile',
  templateUrl: './restaurant-profile.component.html',
  styleUrls: ['./restaurant-profile.component.css'],
  animations: [
    trigger('toolbarSlide', [
      transition('* <=> void', [useAnimation(slide, { params: { time: '.25s' } })])
    ]),
    trigger('fadeInOut', [
      transition('* <=> void', [useAnimation(fadeInOut, { params: { time: '1s' } })])
    ])
  ]
})
export class RestaurantProfileComponent implements OnInit {

  resForm: FormGroup;
  restaurant: Restaurant;
  restaurant_id: string;
  isNotSet = false;

  get name() {
    return this.resForm.get('name');
  }

  get description() {
    return this.resForm.get('description');
  }

  get adress() {
    return this.resForm.get('adress');
  }

  get phone() {
    return this.resForm.get('phone');
  }

  constructor(private fb: FormBuilder, private chefDataService: ChefDataService,
    public snackbar: SnackbarService, private authService: AuthService) { }

  ngOnInit() {
    this.getData();
    this.resForm = this.fb.group({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      adress: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required])
    });

  }

  getData() {
    this.chefDataService.getRestaurantData()
    .subscribe(restaurant => {
      this.restaurant_id = restaurant.restaurant_id;
      this.setForm(restaurant);
    });
  }

  setForm(restaurant: Restaurant) {
    this.resForm.get('name').setValue(restaurant.name);
    this.resForm.get('description').setValue(restaurant.description);
    this.resForm.get('adress').setValue(restaurant.adress);
    this.resForm.get('phone').setValue(restaurant.phone);
  }

  updateData(formValues: Restaurant) {
    this.chefDataService.putRestaurantData(formValues)
    .subscribe(restaurant => {
      if (restaurant) {
        this.authService.setRestaurantOnClient();
        this.resetFields(restaurant);
        this.isNotSet = false;
        this.restaurant_id = restaurant.restaurant_id;
        this.snackbar.open('Restaurant data correctly saved', null, 'green-snackbar', 2000);
      }
    });
  }

  resetFields(restaurant: Restaurant) {
    this.resForm.reset();
    this.setForm(restaurant);
  }

}