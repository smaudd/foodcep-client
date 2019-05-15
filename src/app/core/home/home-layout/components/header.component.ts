import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-header',
  template: `
  <div class="header" fxLayoutAlign="center">
  <div fxLayout="row" fxLayout.lt-md="column">
    <div class="image">
        <img class="main-img" src="../../../assets/logo/loco-circle.png">
    </div>
      <div>
          <h1 class="title">FOODCEP</h1>
          <h2 class="subtitle">Evaluate your food</h2>
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
