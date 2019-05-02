import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-nav',
  template: `
  <mat-toolbar class="toolbar mat-elevation-z2" color="primary">
    <button mat-button routerLink="/home" fxLayoutGap="5px">
      <img class="icon" src="../../../assets/logo/loco-circle.png">
      <span class="icon-text" style="margin-left: 5px">foodcep</span>
    </button>
    <span class="spacer"></span>
    <button mat-button routerLink="get-started">
        <span class="icon-text">Get Started</span>
    </button>
    <button mat-button>
      <span class="icon-text" [matMenuTriggerFor]="login">Login</span>
    </button>
    <mat-menu #login="matMenu">
        <app-login></app-login>
    </mat-menu>
  </mat-toolbar>
  `,
  styleUrls: ['../home-layout.component.scss']
})
export class HomeNavComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
