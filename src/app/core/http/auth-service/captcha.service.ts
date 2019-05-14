import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  }),
  withCredentials: true,
};

@Injectable({
  providedIn: 'root'
})
export class RecaptchaService {

  captchaRoute = '~/captcha/verify'

  constructor(
    private http: HttpClient,
  ) { }

  captchaVerification(forgot: any) {
    return this.http.post(this.captchaRoute, forgot, httpOptions)
  }


}
