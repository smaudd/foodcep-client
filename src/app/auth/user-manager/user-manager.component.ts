import { Component, OnInit } from '@angular/core';
import { StateService as ManagerStateService } from '../user-manager/state.service';

import { User } from '../models/user.model';

@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrls: ['./user-manager.component.css']
})
export class UserManagerComponent implements OnInit {

  displayedColumns: string[] = ['name', 'email', 'role'];
  isOpenProfile = false;
  // Subject for the list of users
  usersSubject$ = this.managerStateService.usersSubject;
  loadingSubject$ = this.managerStateService.loadingSubject;
  profile = false;

  constructor(
    private managerStateService: ManagerStateService,
  ) {}

  ngOnInit() {
    this.usersSubject$.subscribe();
    // Getting the list of users
    this.managerStateService.getUsers();
  }

  loadUser(user: User) {
    // Notifies local state to profile state which user are we loading
    this.toggleProfile();
    this.managerStateService.profile(user);
  }

  toggleProfile() {
    this.isOpenProfile ? this.isOpenProfile = false : this.isOpenProfile = true;
  }

}
