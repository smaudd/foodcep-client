import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home-nav',
  template: `
  <mat-toolbar class="toolbar mat-elevation-z2">
    <button mat-button routerLink="/land" fxLayoutGap="5px">
      <span style="margin-left: 5px">FOODCEP</span>
    </button>
    <div fxShow="true" fxHide.lt-sm="true">
      <small>
        <button mat-button (click)="changeLanguage('en')">EN</button>
        <span> | </span>
        <button mat-button (click)="changeLanguage('spa')">ESP</button>
      </small>
    </div>
    <span class="spacer"></span>
    <button mat-button routerLink="get-started">
        <span translate>HOME.GET-STARTED</span>
    </button>
    <button mat-button [matMenuTriggerFor]="login">
      <span #menuTrigger="matMenuTrigger" translate>HOME.LOGIN</span>
    </button>
    <mat-menu #login="matMenu">
        <app-login (closeMe)="menuTrigger.closeMenu()"></app-login>
    </mat-menu>
  </mat-toolbar>
  `,
  styleUrls: ['../home-layout.component.scss']
})
export class HomeNavComponent implements OnInit {

  constructor(private translateService: TranslateService) { }

  ngOnInit() {
  }

  changeLanguage(language: string) {
    this.translateService.use(language);
    this.translateService.setDefaultLang(language);
  }


}
