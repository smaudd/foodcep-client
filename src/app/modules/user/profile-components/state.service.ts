import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
import { ProfileService } from '../../../core/http/user-profile-data-service/profile.service';
import { User } from '../../../core/auth/models/user.model';
import { IEmailChange, IDelete, ILanguageChange, INameChange, IPasswordChange, IRoleChange } from '../../../core/auth/models/input.interfaces';
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

    constructor(
        private profileService: ProfileService
    ) { }


  // Get user using SESSION_ID cookie to know which user is logged
  getUser() {
    this.loadingSubject.next(true);
    this.profileService.getProfile()
    .pipe(take(1))
    .subscribe((user: User) => {
    this.userSubject.next(user);
    this.loadingSubject.next(false);
    });
  }

  // Change email
  updateEmail(userData: IEmailChange) {
    this.loadingSubject.next(true);
    this.profileService.putEmail(userData)
    .subscribe(user => {
       this.userSubject.next(user);
       this.loadingSubject.next(false);
       this.errorsSubject.next(false);
    }, error => {
      this.loadingSubject.next(false);
      this.errorsSubject.next(error.status);
    });

  }

  // Change password
  updatePassword(userData: IPasswordChange) {
    this.loadingSubject.next(true);
    this.profileService.putPassword(userData)
    .subscribe(value => {
      this.userSubject.next(value);
      this.loadingSubject.next(false);
      this.errorsSubject.next(false);
    }, error => {
      this.errorsSubject.next(error.status);
    });
  }

  // Change name
  updateName(userData: INameChange) {
    this.loadingSubject.next(true);
    this.profileService.putName(userData)
    .subscribe(user => {
      this.userSubject.next(user);
      this.loadingSubject.next(false)
    });
  }

  // Change role
  updateRole(userData: IRoleChange) {
    this.loadingSubject.next(true);
    this.profileService.putRole(userData)
    .subscribe(user => {
      this.userSubject.next(user);
      this.loadingSubject.next(false)
    });
  }

  // Change default language
  updateLanguage(userData: ILanguageChange) {
    this.loadingSubject.next(true);
    this.profileService.defaultLanguage(userData)
    .subscribe(value => {
      this.userSubject.next(value);
      this.loadingSubject.next(false);
    });
  }

  // Delete account
  deleteAccount(userData: IDelete) {
    this.loadingSubject.next(true);
    this.profileService.deleteAccount(userData)
    .subscribe(user => {
      this.userSubject.next(user);
      this.errorsSubject.next(false);
    }, error => {
      this.errorsSubject.next(error.status);
    });
  }

}
