import { Injectable } from '@angular/core';
import { ChefDataService } from '../../../core/http/chef-data-service/chef-data.service';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class StateService {

    usersSubject = new BehaviorSubject([]);
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

}
