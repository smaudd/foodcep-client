import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { trigger, transition, useAnimation } from '@angular/animations';
import { slide, fadeInOut } from '../../animations/navigation-animations';

@Component({
  selector: 'app-orders-suppliers',
  templateUrl: './orders-suppliers.component.html',
  styleUrls: ['./orders-suppliers.component.css'],
  animations: [
    trigger('toolbarSlide', [
      transition('* <=> void', [useAnimation(slide, { params: { time: '.25s' } })])
    ]),
    trigger('fadeInOut', [
      transition('* <=> void', [useAnimation(fadeInOut, { params: { time: '1s' } })])
    ])
  ]
})
export class OrdersSuppliersComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {}

}
