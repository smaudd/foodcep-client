import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-home-footer',
  template: `
  <mat-toolbar style="font-size: 14px; background-color: #356859;">
    <p class="toolbar-button">©2019 Foodcep</p>
    <span class="spacer"></span>
    <mat-icon svgIcon="open-source" class="toolbar-button"></mat-icon>
  </mat-toolbar>
  `,
  styleUrls: ['../home-layout.component.scss']
})
export class HomeFooterComponent implements OnInit {

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'open-source',
      sanitizer.bypassSecurityTrustResourceUrl('../../../../../assets/icons/open-source.svg'));
  }

  ngOnInit() {
  }

}
