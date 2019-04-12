import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap, mapTo, take } from 'rxjs/operators';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

import { User } from '../models/user.model';
import { TranslateService } from '@ngx-translate/core';
import { SessionDataService } from './session-data.service';
import { ProfileService } from './profile.service';
import { Router } from '@angular/router';

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
    private profileService: ProfileService,
    private translateService: TranslateService,
    private router: Router
  ) { }

  private authUrl = 'api/auth';
  private logoutUrl = 'api/logout';
  private refreshUrl = 'api/refresh';
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
      tap(response => {
        console.log(response);
        localStorage.setItem('Language', response.language);
        this.translateService.use(response.language);
        this.populateSubject(response);
        this.setRestaurantOnClient();
      }),
      mapTo(true),
      catchError(error => {
        return throwError(error);
      })
    );
  }

  setRestaurantOnClient() {
    this.profileService.getRestaurantData().subscribe(restaurant => {
      localStorage.setItem('Restaurant', restaurant.name);
      localStorage.setItem('Adress', restaurant.adress);
      localStorage.setItem('Phone', restaurant.phone);
      localStorage.setItem('Cusine', restaurant.cusine);
    });
  }

  populateSubject(value: any) {
    this.loggedIn.next(true);
    this.role.next(value.role);
    this.name.next(value.name);
  }

  logout(malicious?: boolean): Observable<boolean> {
    return this.http.post<any>(this.logoutUrl, { malicious: malicious }, httpOptions).pipe(
      take(1),
      tap(reply => {
        this.logoutUser();
        this.loggedIn.next(false);
        this.router.navigate(['/login']);
      }),
      mapTo(true),
      catchError(error => {
        return throwError(error);
      })
    );
  }

  logoutUser() {
    localStorage.clear();
    this.cookieService.deleteAll();
  }

  refreshSession(): Observable<any> {
    return this.http.get(this.refreshUrl, httpOptions)
    .pipe(
      catchError(err => {
        return throwError(err);
      })
    );
  }

}
