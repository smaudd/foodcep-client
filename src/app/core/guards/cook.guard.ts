import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../http/auth-service/auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CookGuard implements CanActivate  {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): Observable<boolean> {
    return this.authService.userRole
    .pipe(
      map((role: string) => {
        if (role === 'cook') {
          this.router.navigate(['/recipes']);
          return false;
        }
        return true;
      })
    );
  }

}
