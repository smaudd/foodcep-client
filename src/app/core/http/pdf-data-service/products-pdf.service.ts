import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  }),
  withCredentials: true,
};

@Injectable({
  providedIn: 'root'
})
export class ProductsPDFService {

  private pdfRoute = '~/api/products/pdf';
  constructor(private http: HttpClient, private cookieService: CookieService) { }

  getPDFData(): Observable<any> {
    const CURRENCY = this.cookieService.get('CURRENCY')
    return this.http.get<any>(this.pdfRoute, httpOptions)
    .pipe(
      map(value => {
          value.map(item => {
            item.price = item.price + CURRENCY;
            item.cost = item.cost + CURRENCY;
            item.loss = item.loss + 'gr';
        })
        return value
      })
    )
  }


}
