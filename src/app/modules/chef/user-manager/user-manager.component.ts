import { Component, OnInit } from '@angular/core';
import { StateService } from './state.service';
import { User } from '../../../core/auth/models/user.model';
import { trigger, transition, useAnimation } from '@angular/animations';
import { slide, fadeInOut } from 'src/app/animations/navigation-animations';

@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrls: ['./user-manager.component.css'],
  animations: [
    trigger('toolbarSlide', [
      transition('* <=> void', [useAnimation(slide, { params: { time: '.25s' } })])
    ]),
    trigger('fadeInOut', [
      transition('* <=> void', [useAnimation(fadeInOut, { params: { time: '.5s' } })])
    ])
  ]
})
export class UserManagerComponent implements OnInit {

  displayedColumns: string[] = ['name', 'email', 'role'];
  isOpenProfile = false;
  // Subject for the list of users
  usersSubject$ = this.stateService.usersSubject;
  loadingSubject$ = this.stateService.loadingSubject;
  profile = false;

  constructor(
    private stateService: StateService,
  ) {}

  ngOnInit() {
    this.usersSubject$.subscribe();
    // Getting the list of users
    this.stateService.getUsers();
  }

  loadUser(user: User) {
    // Notifies local state to profile state which user are we loading
    this.toggleProfile();
  }

  toggleProfile() {
    this.isOpenProfile ? this.isOpenProfile = false : this.isOpenProfile = true;
  }

}
