import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SessionDataService } from '../../../modules/shared/services/session-data.service';

import { User } from '../../auth/models/user.model';
import { INameChange, IPasswordChange, IEmailChange, ILanguageChange, IDelete, IRoleChange, ICurrencyChange } from '../../auth/models/input.interfaces';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  }),
  withCredentials: true,
};

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  userUrl = '~/api/user/profile';
  restaurant = '~/api/restaurant/read';

  constructor(private http: HttpClient, private sessionDataService: SessionDataService) { }

  getProfile(): Observable<User> {
    // The query use the SESSION_ID cookie to know which user is requesting its data
    return this.http.get<User>(this.userUrl)
  }

  putName(userData: INameChange): Observable<User> {
    return this.http.put<INameChange>('~/api/user/name/update', userData, httpOptions)
  }

  putEmail(userData: IEmailChange): Observable<User> {
    return this.http.put<IEmailChange>('~/api/user/email/update', userData, httpOptions)
  }

  putPassword(userData: IPasswordChange): Observable<User> {
    return this.http.put<IPasswordChange>('~/api/user/password/update', userData, httpOptions)
  }

  putRole(userData: IRoleChange): Observable<User> {
    return this.http.put<IRoleChange>('~/api/user/role/update', userData, httpOptions);
  }

  putCurrency(userData: ICurrencyChange): Observable<User> {
    return this.http.put<any>('~/api/user/currency/update', userData, httpOptions)
  }

  deleteAccount(userData: IDelete): Observable<any> {
    const options =  {
      headers: new HttpHeaders ({
      'Content-Type': 'application/json'
      }),
      body: {
        email: userData.email,
        password: userData.password
      }
    }
    return this.http.delete('~/api/user/delete', options)
  }

  defaultLanguage(userData: ILanguageChange): Observable<User> {
    return this.http.put<any>('~/api/user/language/update', userData, httpOptions)
  }

}
