import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements  CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): Observable<boolean>  {
      return this.authService.isLoggedIn
        .pipe(
          map((isLoggedIn: boolean) => {
            if (!isLoggedIn) {
              this.router.navigate(['user/login']);
              return false;
            }
            return true;
          })
        );
    }
  }

