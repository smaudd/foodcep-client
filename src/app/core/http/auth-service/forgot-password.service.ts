import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  }),
  withCredentials: true,
};

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {

  captchaRoute = '~/captcha/verify'
  updateRoute = '~/forgot-password/update'
  constructor(
    private http: HttpClient,
  ) { }

  changePassword(update: any): Observable<object> {
    return this.http.post(this.updateRoute, update, httpOptions)
  }

  captchaVerification(forgot: any) {
    return this.http.post(this.captchaRoute, forgot, httpOptions)
  }


}
