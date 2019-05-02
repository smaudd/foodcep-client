import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-header',
  template: `
  <div>
  <div class="header" fxLayoutAlign="center">
    <div>
      <div class="image">
          <img class="main-img" src="../../../assets/logo/loco-circle.png">
      </div>
        <div>
            <h1 class="title">foodcep</h1>
            <h2 class="subtitle">Evaluate your food</h2>
        </div>
      </div>
    </div>
  </div>
  `,
  styleUrls: ['../home-layout.component.scss']
})
export class HomeHeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
