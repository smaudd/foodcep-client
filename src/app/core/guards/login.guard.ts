import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../http/auth-service/auth.service';
import { map, delay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
    private http: HttpClient

    ) { }

  canActivate(): Observable<boolean> {
    return this.authService.isLoggedIn
    .pipe(
      map((isLoggedIn: boolean) => {
        if (!isLoggedIn) {
          this.router.navigate(['/land']);
          return false;
        }
        // On load refresh the cookies
        //this.http.get('~/').subscribe();
        return true
      }),
      delay(500)
    );
  }
}

