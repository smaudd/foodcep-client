import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../../auth/models/user.model';
import { Restaurant } from '../../auth/models/restaurant.model';
import { SessionDataService } from '../../../modules/shared/services/session-data.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  }),
  withCredentials: true,
};

@Injectable({
  providedIn: 'root'
})
export class ChefDataService {

  users = '~/api/user/team';
  restaurant = '~/api/restaurant';

  constructor(private http: HttpClient, private sessionDataService: SessionDataService) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.users)
  }

  getRestaurantData(): Observable<Restaurant> {
    return this.http.get<Restaurant>(this.restaurant + '/read', httpOptions)
    .pipe(
      tap(restaurant => {
        // Send the restaurant name to SesionDataService
        this.sessionDataService.restaurantSubject.next(restaurant.name);
      })
    )
  }

  putRestaurantData(restaurant: Restaurant): Observable<Restaurant> {
    return this.http.put<Restaurant>(this.restaurant + '/update', restaurant, httpOptions)
  }
}

