import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../http/auth-service/auth.service';
import { Observable, throwError, BehaviorSubject, of } from 'rxjs';
import { catchError, switchMap, take, filter, first } from 'rxjs/operators';
import { Router} from '@angular/router';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  isRefreshing = false;
  requestSubject = new BehaviorSubject<any>(null);

  constructor(public authService: AuthService, private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any | never> {

    if (request) {
        return next.handle(request)
        .pipe(
            //delay(500),
            catchError(error => {
                // If we have a response with 401 status retry the request in order to use the refreshed token
                    if (error.status === 401 && error instanceof HttpErrorResponse) {
                        return this.handle401(request, next);
                    }

                    if (error.status === 403) {
                        this.forbiden();
                    }
                    // If we have another error code just send the error response
                    return throwError(error);
                })
            );
        }
    }

    forbiden() {
        this.authService.logout(true)
        .pipe(
          first(),
          take(1)
        )
        .subscribe(response => {
        return this.router.navigate(['/land']);
    });
    }

    handle401(request, next) {
      if (!this.isRefreshing) {
        this.isRefreshing = true;
        this.requestSubject.next(null);

          return this.authService.refreshSession().pipe(
            switchMap((response: any) => {
              this.isRefreshing = false;
              this.requestSubject.next(true);
              return next.handle(request);
            })
          )
      } else {
        return this.requestSubject.pipe(
          filter(value => value != null),
          take(1),
          switchMap(value => {
            return next.handle(request);
          })
        )
      }
    }

}
