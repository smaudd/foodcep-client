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
export class DishesPDFService {

  private pdfRoute = '~/api/dishes/read/complete/';
  constructor(private http: HttpClient) { }

  getPDFData(dish_id: number): Observable<any> {
    return this.http.get<any>(this.pdfRoute + dish_id, httpOptions)
    .pipe(
      map(value => {
        console.log(value);
          value.ingredients.map(item => {
            item.pPP = item.gPP * item.cost / 1000 + '€';
            item.cost = item.cost + '€';
            item.gPP = item.gPP + 'gr';
        })
        return value
      })
    )
  }


}
