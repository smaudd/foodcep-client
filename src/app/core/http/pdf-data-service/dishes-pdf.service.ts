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
export class DishesPDFService {

  private pdfRoute = '~/api/dishes/read/complete/';
  constructor(private http: HttpClient, private cookieService: CookieService) { }

  getPDFData(dish_id: number): Observable<any> {
    const CURRENCY = this.cookieService.get('CURRENCY')
    return this.http.get<any>(this.pdfRoute + dish_id, httpOptions)
    .pipe(
      map(value => {
        console.log(value);
          value.ingredients.map(item => {
            item.pPP = item.gPP * item.cost / 1000 + CURRENCY;
            item.cost = item.cost + CURRENCY;
            item.gPP = item.gPP + 'gr';
        })
        return value
      })
    )
  }


}
