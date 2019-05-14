import { Injectable } from '@angular/core';
import { ChefDataService } from '../../../core/http/chef-data-service/chef-data.service';
import { BehaviorSubject } from 'rxjs';
import { IUserChange } from './user-change.interface';


@Injectable({
  providedIn: 'root'
})
export class StateService {

    usersSubject = new BehaviorSubject(null);
    adminSubject = new BehaviorSubject(null);
    loadingSubject = new BehaviorSubject(null);
    constructor(
        private chefDataService: ChefDataService,
    ) { }

  getUsers() {
    this.loadingSubject.next(true);
    this.chefDataService.getUsers()
    .subscribe(response => {
    this.usersSubject.next(response);
    this.loadingSubject.next(false);
    });
  }

  updateUser(user: IUserChange) {
    this.loadingSubject.next(true);
    this.chefDataService.putUser(user)
    .subscribe(response => {
      const list = this.usersSubject.value.filter(user => response.user_id !== user.user_id)
      this.usersSubject.next([...list, response])
      this.loadingSubject.next(false);
    })
  }

  deleteUser(user_id: number) {
    this.loadingSubject.next(true);
    this.chefDataService.deleteUser(user_id)
    .subscribe(response => {
      const list = this.usersSubject.value.filter(user => response.user_id !== user.user_id)
      this.usersSubject.next(list);
      this.loadingSubject.next(false);
    })
  }

}
