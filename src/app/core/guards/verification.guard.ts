import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../http/auth-service/auth.service';
import { map } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { VerificationDialogComponent } from '../auth/login/verification-dialog.component';


@Injectable({
  providedIn: 'root'
})
export class VerificationGuard implements  CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog
    ) { }

  canActivate(): Observable<boolean>  {
      return this.authService.isVerified
        .pipe(
          map((isVerified: number) => {
            // console.log(isVerified)
            if (isVerified === 0) {
              // console.log('gotcha!')
              return false;
            }
            return true;
          })
        );
    }
  }

