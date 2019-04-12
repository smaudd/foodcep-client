import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse, HttpClient } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { Observable, throwError, of, BehaviorSubject, timer } from 'rxjs';
import { catchError, retry, map, tap, take, switchMap, retryWhen, filter, delayWhen, mergeMap } from 'rxjs/operators';
import { Router, NavigationEnd } from '@angular/router';
import { routerNgProbeToken } from '@angular/router/src/router_module';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  private subject = new BehaviorSubject<boolean>(false);
  isRefreshing = false;
  firstRequest = new Array();
  i = 0;

  constructor(public authService: AuthService, private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any | never> {

    if (request) {
        return next.handle(request)
        .pipe(
            catchError(error => {
                // If we have a response with 401 status retry the request in order to use the refreshed token

                    if (error.status === 401 && error instanceof HttpErrorResponse) {
                        return this.authService.refreshSession().pipe(
                            switchMap((response) => {
                                if (response) {
                                    return next.handle(request);
                                }
                            })
                        );
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
        this.authService.logout(true).subscribe(response => {
        return this.router.navigate(['/login']);
    });
    }

}
