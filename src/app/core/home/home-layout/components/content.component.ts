import { Component } from '@angular/core';
import { trigger, transition, useAnimation } from '@angular/animations';
import { fadeInOut } from 'src/app/animations/navigation-animations';

@Component({
  selector: 'app-home-content',
  template: `
  <div fxLayout="row" [@fadeInOut]>
  <div class="header" fxLayoutAlign="center">
    <div fxLayout="row" fxLayout.lt-md="column" fxLayoutGap.gt-md="30px">
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
  <div fxLayoutAlign="center">
    <div class="box-paragraph">
      <div fxLayout="column">
        <h3 class="p-title">SAVE TIME AND FOOD</h3>
        <p style="text-align: justify">
          <strong style="margin: 15px;">foodcep</strong>
          is a modern way to manage your kitchen administrative labor.
          <br><br>
          Leave the painfull Excel sheets and start relying on modern
          software to calculate your cost evaluation in a progressive way.
          <br><br>
          Manage your daily orders and record them easily.
          <br><br>
          Involve your team on the process of making your bussiness better by managing it on a smart way.
        </p>
      </div>
      <br><br>
      <div align="center">
        <button mat-raised-button color="primary" style="width: 100%" routerLink="signin">Start Now!</button>
      </div>
    </div>
  </div>
  `,
  styleUrls: ['../home-layout.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition('* <=> void', [useAnimation(fadeInOut, { params: { time: '.5s' } })])
    ])
  ]
})
export class HomeContentComponent {}
