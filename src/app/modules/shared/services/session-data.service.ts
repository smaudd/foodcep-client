import { Injectable } from '@angular/core';

import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SessionDataService {

restaurantSubject = new BehaviorSubject<string>(this.getRestaurantName());

get restaurantName() {
  return this.restaurantSubject.asObservable();
}

  constructor(private cookieService: CookieService) { }

getUsername() {
  return this.cookieService.get('USER');
}

getRole() {
  return this.cookieService.get('ROLE');
}

getRestaurantName() {
  return localStorage.getItem('Restaurant');
}

isUserAvailable() {
  return !!this.cookieService.get('USER');
}

}
