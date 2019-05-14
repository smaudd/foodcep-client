import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Stats } from '../../layout/land/models/stats.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  }),
  withCredentials: true,
};

@Injectable({
  providedIn: 'root'
})
export class StatsDataService {

  statsRoute = '~/api/user/stats';

  constructor(private http: HttpClient) { }

  getStats(): Observable<Stats> {
    return this.http.get(this.statsRoute, httpOptions);
  }

 }
