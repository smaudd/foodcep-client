import { Component } from '@angular/core';
import { trigger, transition, useAnimation } from '@angular/animations';
import { slide } from '../../animations/navigation-animations';


@Component({
  selector: 'app-products-manager',
  templateUrl: './products-manager.component.html',
  animations: [
    trigger('toolbarSlide', [
      transition('* <=> void', [useAnimation(slide, { params: { time: '.25s' } })])
    ])
  ]
})
export class ProductsManagerComponent {

  constructor() { }

}
