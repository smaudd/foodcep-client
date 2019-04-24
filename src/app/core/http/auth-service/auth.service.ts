import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, mapTo, take } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

import { User } from '../../auth/models/user.model';
import { TranslateService } from '@ngx-translate/core';
import { SessionDataService } from '../../../modules/shared/services/session-data.service';
import { Router } from '@angular/router';
import { ChefDataService } from '../chef-data-service/chef-data.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  }),
  withCredentials: true,
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private sessionDataService: SessionDataService,
    private chefDataService: ChefDataService,
    private translateService: TranslateService,
    private router: Router
  ) { }

  private authUrl = '~/login';
  private logoutUrl = '~/logout';
  private refreshUrl = '~/refresh';
  private loggedIn = new BehaviorSubject<boolean>(this.sessionDataService.isUserAvailable());
  private role = new BehaviorSubject<string>(this.sessionDataService.getRole());
  private name = new BehaviorSubject<string>(this.sessionDataService.getUsername());

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  get userRole() {
    return this.role.asObservable();
  }

  get userName() {
    return this.name.asObservable();
  }

  askForCookies(user: User): Observable<boolean> {
    return this.http.post<any>(this.authUrl, user, httpOptions).pipe(
      tap(_ => {
        const user = {
          name: this.cookieService.get('USER'),
          role: this.cookieService.get('ROLE'),
          lang: this.cookieService.get('LANGUAGE')
        }
        this.translateService.use(user.lang);
        this.populateSubject(user);
        this.setRestaurantOnClient();
      })
    );
  }

  setRestaurantOnClient() {
    this.chefDataService.getRestaurantData().subscribe(restaurant => {
      localStorage.setItem('Restaurant', restaurant.name);
      localStorage.setItem('Adress', restaurant.adress);
      localStorage.setItem('Phone', restaurant.phone);
    });
  }

  populateSubject(user: any) {
    this.loggedIn.next(true);
    this.role.next(user.role);
    this.name.next(user.name);
  }

  logout(malicious?: boolean): Observable<boolean> {
    return this.http.post<any>(this.logoutUrl, { malicious: malicious }, httpOptions).pipe(
      take(1),
      tap(reply => {
        this.router.navigate(['/login']);
        this.logoutUser();
        this.loggedIn.next(false);
      }),
      mapTo(true)
    )
  }

  logoutUser() {
    localStorage.clear();
    // this.cookieService.deleteAll();
  }

  refreshSession(): Observable<any> {
    return this.http.post(this.refreshUrl, httpOptions);
  }

}
