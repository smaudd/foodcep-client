import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from '../../auth/models/user.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  }),
  withCredentials: true,
};

@Injectable({
  providedIn: 'root'
})
export class CurrenciesService {

  currencies = '~/currencies';
  updateCurrency = '~/api/user/currency/update'

  constructor(private http: HttpClient) { }

  getCurrencies(): Observable<any> {
    return this.http.get<User>(this.currencies)
  }


}
