import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-home-footer',
  template: `
  <mat-toolbar style="font-size: 14px">
    <p style="text-align: center">©2019 Foodcep</p>
    <span class="spacer"></span>
    <mat-icon svgIcon="open-source" color="primary"></mat-icon>
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
