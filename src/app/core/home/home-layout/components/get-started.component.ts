import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-get-started',
  template: `
  <markdown [src]="'assets/documentation/get-started.md'"></markdown>
  `,
  styleUrls: ['../home-layout.component.scss']
})
export class GetStartedComponent implements OnInit {

  ngOnInit() {
  }

}
