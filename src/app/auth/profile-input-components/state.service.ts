import { Injectable } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { BehaviorSubject, throwError } from 'rxjs';
import { ProfileService } from '../services/profile.service';
import { User } from '../models/user.model';
import { IEmailChange, IDelete, ILanguageChange, INameChange, IPasswordChange, IRoleChange } from '../models/input.interfaces';
import { take } from 'rxjs/operators';

interface Notification {
  action: string;
  user: User;
}

@Injectable({
  providedIn: 'root'
})
export class StateService {

    get user() {
      return this.userSubject.asObservable();
    }
    userSubject = new BehaviorSubject({});
    loadingSubject = new BehaviorSubject(null);
    errorsSubject = new BehaviorSubject(null);
    // This subject will be subscribed on the state store of the users manager component
    managerNotificationsSubject = new BehaviorSubject(null);

    constructor(
        private adminService: AdminService,
        private profileService: ProfileService
    ) { }


  // Get user using SESSION_ID cookie to know which user is logged
  get() {
    this.loadingSubject.next(true);
    this.profileService.getProfile()
    .pipe(take(1))
    .subscribe((user: User) => {
    this.userSubject.next(user);
    this.loadingSubject.next(false);
    });
  }

  // Change email
  changeEmail(userData: IEmailChange, endpoint: string) {
    this.loadingSubject.next(true);
    this.profileService.putEmail(userData, endpoint)
    .subscribe(user => {
       this.userSubject.next(user);
       this.loadingSubject.next(false);
       this.errorsSubject.next(false);
       this.sendNotificationToManager('put', user);
    }, error => {
      this.loadingSubject.next(false);
      this.errorsSubject.next(error.status);
    });

  }

  // Change password
  changePassword(userData: IPasswordChange, endpoint: string) {
    this.loadingSubject.next(true);
    this.profileService.putPassword(userData, endpoint)
    .subscribe(value => {
      this.userSubject.next(value);
      this.loadingSubject.next(false);
    });
  }

  // Change name
  changeName(userData: INameChange, endpoint: string) {
    this.loadingSubject.next(true);
    this.profileService.putName(userData, endpoint)
    .subscribe(user => {
      this.userSubject.next(user);
      this.loadingSubject.next(false);
      this.sendNotificationToManager('put', user);
    });
  }

  // Change role
  changeRole(userData: IRoleChange, endpoint: string) {
    this.loadingSubject.next(true);
    this.profileService.putRole(userData, endpoint)
    .subscribe(user => {
      this.userSubject.next(user);
      this.loadingSubject.next(false);
      this.sendNotificationToManager('put', user);
    });
  }

  // Change default language
  changeLanguage(userData: ILanguageChange, endpoint: string) {
    this.loadingSubject.next(true);
    this.profileService.defaultLanguage(userData, endpoint)
    .subscribe(value => {
      this.userSubject.next(value);
      this.loadingSubject.next(false);
    });
  }

  // Delete account
  deleteAccount(userData: IDelete, endpoint: string) {
    this.loadingSubject.next(true);
    this.profileService.deleteAccount(userData, endpoint)
    .subscribe(user => {
      this.userSubject.next(user);
      this.sendNotificationToManager('delete', user);
    });
  }

  sendNotificationToManager(action: string, user: User) {
    const notification: Notification = {
      action: action,
      user: user
    };
    this.managerNotificationsSubject.next(notification);
  }
}
