import { Component, OnInit } from '@angular/core';

import { Ingredient } from '../shared/models/ingredient.model';
import { Dish } from './models/dish.model';
import { TranslateService } from '@ngx-translate/core';
import { take } from 'rxjs/operators';
import { trigger, transition, useAnimation } from '@angular/animations';
import { slide, fadeInOut } from '../../animations/navigation-animations';

@Component({
  selector: 'app-dishes-manager',
  templateUrl: './dishes-manager.component.html',
  styleUrls: ['./dishes-manager.component.css'],
  animations: [
    trigger('toolbarSlide', [
      transition('* <=> void', [useAnimation(slide, { params: { time: '.25s' } })])
    ]),
    trigger('fadeInOut', [
      transition('* <=> void', [useAnimation(fadeInOut, { params: { time: '1s' } })])
    ])
  ]
})
export class DishesManagerComponent implements OnInit {

  ingredientsList: Ingredient[];
  dishes: Dish[] = new Array();
  dish: Dish;
  editDish = false;
  newDish = false;
  menuName: string;
  emptyCollection: boolean;
  firstInit = true;

  constructor(public translate: TranslateService) { }

  ngOnInit() {
    this.translateValue('DISHES.DASHBOARD');
  }

  translateValue(key: string) {
    this.translate.get(key)
    .pipe(
      take(1)
    ).subscribe(value => {
      this.menuName = value;
    });
  }

  loadEditor(dish: any) {
    this.translateValue('DISHES.EDIT-DISH');
    this.dish = dish;
    this.editDish = true;
  }

  createNewDish() {
    this.translateValue('DISHES.CREATE-DISH');
    this.changeFlags(true, false);
  }

  initState() {
    this.firstInit = false;
    this.translateValue('DISHES.DASHBOARD');
    this.changeFlags(false, false);
  }

  changeFlags(newDish: boolean, editDish: boolean) {
    this.newDish = newDish;
    this.editDish = editDish;
  }

}
