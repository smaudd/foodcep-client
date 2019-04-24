import { Injectable, } from '@angular/core';
import { HttpRequest, HttpHandler, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { ErrorDialogComponent } from '../error-components/error500-dialog.component';

@Injectable()
export class ErrorsInterceptor implements HttpInterceptor {

  constructor(private errorDialog: MatDialog) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any | never> {

    if (request) {
        return next.handle(request)
        .pipe(
            catchError(error => {
                if (error instanceof HttpErrorResponse && (error.status === 500 || error.status === 504)) {
                  const dialogRef = this.errorDialog.open(ErrorDialogComponent,
                    { width: '450px', data: error }
                  )
                  dialogRef.afterClosed().subscribe((value: HttpErrorResponse) => {
                      location.reload();
                  })
                }
                return throwError(error)
            })
        )
    }
  }

}

