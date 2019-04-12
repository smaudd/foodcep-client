import { Injectable } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { StateService as ProfileStateService } from '../profile-input-components/state.service';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StateService {

    usersSubject = new BehaviorSubject([]);
    adminSubject = new BehaviorSubject(null);
    loadingSubject = new BehaviorSubject(null);
    notifications$ = this.profileStateService.managerNotificationsSubject;
    constructor(
        private adminService: AdminService,
        private profileStateService: ProfileStateService
    ) { }

  getUsers() {
    this.loadingSubject.next(true);
    this.adminService.getUsers()
    .subscribe(response => {
    this.usersSubject.next(response);
    this.loadingSubject.next(false);
    });
  }

  profile(user: User) {
    this.profileStateService.userSubject.next(user);
    this.notifications$
    .pipe(take(2))
    .subscribe(notification => {
      if (notification) {
          if (notification.action === 'put') {
            const list = this.put(notification.user, this.usersSubject.value);
            this.usersSubject.next(list);
          } else if (notification.action === 'delete') {
            const list = this.remove(notification.user, this.usersSubject.value);
            this.usersSubject.next(list);
          }
      }
    });
  }

  put(user: User, users: User[]) {
    users = users.filter(item => item._id !== user._id);
    users.push(user);
    return users;
  }

  remove(user: User, users: User[]) {
    users = users.filter(item => item._id !== user._id);
    return users;
  }


}
