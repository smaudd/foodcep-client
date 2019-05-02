import { Component, OnInit } from '@angular/core';
import { StateService } from './state.service';
import { trigger, transition, useAnimation } from '@angular/animations';
import { slide, fadeInOut } from 'src/app/animations/navigation-animations';
import { IUserChange } from './user-change.interface';
import { MatDialog } from '@angular/material';
import { DropUserDialogComponent } from './drop-user-dialog.component';


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

  // Subject for the list of users
  usersSubject$ = this.stateService.usersSubject;
  loadingSubject$ = this.stateService.loadingSubject;
  profile = false;

  constructor(
    private stateService: StateService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.usersSubject$.subscribe();
    // Getting the list of users
    this.stateService.getUsers();
  }

  roleChange(user_id: number, role: string) {
    const user: IUserChange = {
      role: role,
      user_id: user_id
    }
    this.stateService.updateUser(user)
  }

  openDropDialog(user_id: number): void {
    const dialogEditRef = this.dialog.open(DropUserDialogComponent, {
      width: '550px',
      data: user_id
    });
  }
}
