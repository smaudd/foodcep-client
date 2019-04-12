import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';

import { Ingredient } from '../shared/models/ingredient.model';
import { Dish } from './models/dish.model';
import { Category } from '../registre-manager/models/category.model';
import { TranslateService } from '@ngx-translate/core';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-dishes-manager',
  templateUrl: './dishes-manager.component.html',
  styleUrls: ['./dishes-manager.component.css']
})
export class DishesManagerComponent implements OnInit, OnDestroy {

  ingredientsList: Ingredient[];
  categories: Category[];
  dishes: Dish[] = new Array();
  loadedDish: Dish;
  loadDone: true;
  dish: Dish;
  editDish = false;
  newDish = false;
  menuName: string;
  emptyCollection: boolean;
  firstInit = true;
  translatedValue: string;
  subscription: boolean;

  constructor(public translate: TranslateService) { }

  ngOnInit() {
    this.translateValue('DISHES.DASHBOARD');
    this.menuName = this.translatedValue;
  }

  translateValue(key: string) {
    this.subscription = true;
    this.translate.get(key)
    .pipe(
      takeWhile(() => this.subscription)
    ).subscribe(value => {
      this.translatedValue = value;
    });
  }

  loadEditor(dish: any) {
    this.subscription = false;
    this.translateValue('DISHES.EDIT-DISH');
    this.dish = dish;
    this.editDish = true;
    this.menuName = this.translatedValue;
  }

  createNewDish() {
    this.subscription = false;
    this.translateValue('DISHES.CREATE-DISH');
    this.newDish = true;
    this.editDish = false;
    this.menuName = this.translatedValue;
  }

  changeTitle(e: Event) {
    this.subscription = false;
    this.translateValue('DISHES.CREATE-DISH');
    this.menuName = this.translatedValue;
  }

  initState() {
    this.firstInit = false;
    this.subscription = false;
    this.translateValue('DISHES.DASHBOARD');
    this.menuName = this.translatedValue;
    this.newDish = false;
    this.editDish = false;
  }

  setDish(dish: Dish): void {
    this.dish = dish;
  }

  ngOnDestroy() {
    this.subscription = false;
  }

}
