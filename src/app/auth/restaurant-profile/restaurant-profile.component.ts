import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, ControlContainer } from '@angular/forms';
import { AdminService } from '../services/admin.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

import { Restaurant } from '../models/restaurant.model';
import { AuthService } from '../services/auth.service';
import { ProfileService } from '../services/profile.service';


@Component({
  selector: 'app-restaurant-profile',
  templateUrl: './restaurant-profile.component.html',
  styleUrls: ['./restaurant-profile.component.css']
})
export class RestaurantProfileComponent implements OnInit {

  resForm: FormGroup;
  restaurant: Restaurant;
  id = '';
  isNotSet = false;

  get name() {
    return this.resForm.get('name');
  }

  get cusine() {
    return this.resForm.get('cusine');
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

  constructor(private fb: FormBuilder, private admin: AdminService, private profileService: ProfileService,
    public snackbar: SnackbarService, private authService: AuthService) { }

  ngOnInit() {
    this.getData();

    this.resForm = this.fb.group({
      name: new FormControl('', [Validators.required]),
      cusine: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
      description: new FormControl('', [Validators.required]),
      adress: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required])
    });

  }

  setForm(restaurant: Restaurant) {
    this.resForm.get('name').setValue(restaurant.name);
    this.resForm.get('cusine').setValue(restaurant.cusine);
    this.resForm.get('description').setValue(restaurant.description);
    this.resForm.get('adress').setValue(restaurant.adress);
    this.resForm.get('phone').setValue(restaurant.phone);
  }


  saveData(formValues: Restaurant) {
    this.admin.postRestaurantData(formValues, this.id)
    .subscribe(restaurant => {
      if (restaurant) {
        this.authService.setRestaurantOnClient();
        this.resetFields(restaurant);
        this.isNotSet = false;
        this.id = restaurant._id;
        this.snackbar.open('Restaurant data correctly saved', null, 'green-snackbar', 2000);
      }
    }, error => {
      this.snackbar.open('Problems saving your restaurant data', null, 'danger-snackbar', 3000);
    });
  }


  getData() {
    this.profileService.getRestaurantData()
    .subscribe(restaurant => {
      if (restaurant !== null) {
      this.id = restaurant._id;
      this.setForm(restaurant);
      this.isNotSet = false;
      } else {
        this.isNotSet = true;
      }
    }, error => {
      this.snackbar.open('Problems getting your restaurant data', null, 'danger-snackbar', 3000);
    });
  }

  resetFields(restaurant: Restaurant) {
    this.resForm.reset();
    this.setForm(restaurant);
  }

}
