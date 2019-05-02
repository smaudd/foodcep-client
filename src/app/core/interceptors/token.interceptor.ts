import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../http/auth-service/auth.service';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, switchMap, take, retry } from 'rxjs/operators';
import { Router} from '@angular/router';


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
                            retry(1),
                            take(1),
                            switchMap((response) => {
                                if (response) {
                                    return next.handle(request);
                                } else {
                                  this.forbiden();
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
        return this.router.navigate(['/home']);
    });
    }

}
