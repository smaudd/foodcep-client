import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

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
  constructor(private http: HttpClient) { }

  getPDFData(): Observable<any> {
    return this.http.get<any>(this.pdfRoute, httpOptions)
    .pipe(
      map(value => {
          value.map(item => {
            item.price = item.price + '€';
            item.cost = item.cost + '€';
            item.loss = item.loss + 'gr';
        })
        return value
      })
    )
  }


}
