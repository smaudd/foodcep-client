import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, mapTo, take, catchError } from 'rxjs/operators';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

import { User } from '../../auth/models/user.model';
import { TranslateService } from '@ngx-translate/core';
import { SessionDataService } from '../../../modules/shared/services/session-data.service';
import { Router } from '@angular/router';
import { ChefDataService } from '../chef-data-service/chef-data.service';
import { MatDialog } from '@angular/material';
import { VerificationDialogComponent } from '../../auth/login/verification-dialog.component';


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
    private router: Router,
    private dialog: MatDialog
  ) { }

  private authUrl = '~/login';
  private logoutUrl = '~/logout';
  private refreshUrl = '~/refresh';
  private loggedIn = new BehaviorSubject<boolean>(this.sessionDataService.isUserAvailable());
  private verified = new BehaviorSubject(null);
  private role = new BehaviorSubject<string>(this.sessionDataService.getRole());
  private name = new BehaviorSubject<string>(this.sessionDataService.getUsername());
  private loginProcess = new BehaviorSubject(null);

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  get isVerified() {
    return this.verified.asObservable();
  }

  get userRole() {
    return this.role.asObservable();
  }

  get userName() {
    return this.name.asObservable();
  }

  get isloginProcessDone() {
    return this.loginProcess.asObservable();
  }

  askForCookies(user: User): Observable<any> {
    return this.http.post<any>(this.authUrl, user, httpOptions).pipe(
      tap((response) => {
        const user = {
          name: this.cookieService.get('USER'),
          role: this.cookieService.get('ROLE'),
          lang: this.cookieService.get('LANGUAGE')
        }
        // First set the local storage
        this.setRestaurantOnClient();
        this.populateSubject(user, response);
        this.translateService.use(user.lang);
      }),
      catchError(err => {
        // User is not verified
        if (err.status === 406) {
          this.dialog.open(VerificationDialogComponent, {
            data: { user_id: err.error.user }
          });
        }
        return throwError(err);
      })
    );
  }

  setRestaurantOnClient() {
  this.chefDataService.getRestaurantData().subscribe(restaurant => {
      localStorage.setItem('Restaurant', restaurant.restaurant_name);
      localStorage.setItem('Adress', restaurant.adress);
      localStorage.setItem('Phone', restaurant.phone);
    });
  }

  populateSubject(user: any, response: any) {
    this.verified.next(response.verification);
    this.loggedIn.next(true);
    this.role.next(user.role);
    this.name.next(user.name);
    this.loginProcess.next(true);
  }

  logout(malicious?: boolean): Observable<boolean> {
    return this.http.post<any>(this.logoutUrl, { malicious: malicious }, httpOptions).pipe(
      take(1),
      tap(reply => {
        this.logoutUser();
      }),
      mapTo(true)
    )
  }

  logoutUser() {
    this.loggedIn.next(false);
    this.router.navigate(['/land']);
    localStorage.clear();
  }

  refreshSession(): Observable<any> {
    return this.http.post(this.refreshUrl, httpOptions);
  }

}
