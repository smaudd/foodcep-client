import { Component, OnInit } from '@angular/core';
import { trigger, transition, useAnimation } from '@angular/animations';
import { fadeInOut } from 'src/app/animations/navigation-animations';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition('* <=> void', [useAnimation(fadeInOut, { params: { time: '.5s' } })])
    ])
  ]
})
export class LayoutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
