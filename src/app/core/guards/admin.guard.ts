import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, delay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { SessionDataService } from 'src/app/modules/shared/services/session-data.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate  {

  constructor(private sessionDataService: SessionDataService, private router: Router, private http: HttpClient) { }

  canActivate(): Observable<boolean> {
    //this.http.get('~/').subscribe()
    const role = of(this.sessionDataService.getRole());
    return role.pipe(
      map((roleValue: string) => {
        if (roleValue !== 'chef') {
          this.router.navigate(['/']);
          return false
        }
        return true
      })
    )
  }

}
