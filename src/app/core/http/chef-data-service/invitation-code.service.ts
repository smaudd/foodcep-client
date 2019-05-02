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
export class InvitationService {

  invitation = '~/api/user/invite';

  constructor(private http: HttpClient) { }

  generateInvitation(role: string) {
    const userRole = {
      role: role
    }
    return this.http.post(this.invitation, userRole, httpOptions)
  }
}
