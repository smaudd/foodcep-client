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
export class ResendVerificationService {

  route = '~/verify/resend/'
  constructor(
    private http: HttpClient,
  ) { }

  resend(user_id: number): Observable<object> {
    return this.http.post(this.route, { user_id: user_id }, httpOptions)
  }

}
