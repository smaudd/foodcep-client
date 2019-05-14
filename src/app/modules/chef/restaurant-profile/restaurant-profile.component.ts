import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ChefDataService } from '../../../core/http/chef-data-service/chef-data.service';
import { SnackbarService } from 'src/app/modules/shared/services/snackbar.service';

import { Restaurant } from '../../../core/auth/models/restaurant.model';
import { AuthService } from '../../../core/http/auth-service/auth.service';
import { fader } from 'src/app/animations/navigation-animations';

@Component({
  selector: 'app-restaurant-profile',
  templateUrl: './restaurant-profile.component.html',
  styleUrls: ['./restaurant-profile.component.css'],
  animations: [fader]
})
export class RestaurantProfileComponent implements OnInit {

  resForm: FormGroup;
  restaurant: Restaurant;
  restaurant_id: string;
  isNotSet = false;

  get restaurant_name() {
    return this.resForm.get('restaurant_name');
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
      restaurant_name: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      description: new FormControl('', [Validators.required, , Validators.maxLength(200)]),
      adress: new FormControl('', [Validators.required, Validators.maxLength(99)]),
      phone: new FormControl('', [Validators.required, , Validators.maxLength(15)])
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
    this.resForm.get('restaurant_name').setValue(restaurant.restaurant_name);
    this.resForm.get('description').setValue(restaurant.description);
    this.resForm.get('adress').setValue(restaurant.adress);
    this.resForm.get('phone').setValue(restaurant.phone);
  }

  updateData(formValues: Restaurant) {
    console.log(formValues)
    this.chefDataService.putRestaurantData(formValues)
    .subscribe(restaurant => {
      if (restaurant) {
        this.authService.setRestaurantOnClient();
        this.resetFields(restaurant);
        this.isNotSet = false;
        this.restaurant_id = restaurant.restaurant_id;
      }
    });
  }

  resetFields(restaurant: Restaurant) {
    this.resForm.reset();
    this.setForm(restaurant);
  }

}
