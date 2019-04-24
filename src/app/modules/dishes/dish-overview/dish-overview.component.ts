import { Component, Input, OnChanges, EventEmitter, Output } from '@angular/core';
import { transition, trigger, useAnimation } from '@angular/animations';

import { IngredientForDish } from '../../shared/models/ingredient-for-dish.model';
import { Dish } from '../models/dish.model';
import { Ingredient } from '../../shared/models/ingredient.model';

import { SortService } from '../../shared/services/sort.service';
import { OperationsService } from './services/operations.service';
import { IDishInfo } from './dishInfo.interface';
import { StateService } from '../services/state.service';
import { fadeInOut, tableFadeInOut } from 'src/app/animations/navigation-animations';
import { DishesService } from '../../../core/http/dishes-data-service/dishes-get-data.service';
import { PatchService } from './services/patch.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-dish-overview',
  templateUrl: './dish-overview.component.html',
  styleUrls: ['./dish-overview.component.css'],
  animations: [
    trigger('detailExpand', [
      transition('collapsed <=> expanded', useAnimation(tableFadeInOut)),
    ]),
    trigger('fadeInOut', [
      transition('* <=> void', [useAnimation(fadeInOut, { params: { time: '.5s' } })])
    ])
  ]
})
export class DishOverviewComponent implements OnChanges {

  @Input() dish_id: number = undefined;
  @Output() init = new EventEmitter();
  columnsToDisplay = ['name', 'gPP', 'pPP'];
  expandedIngredient: Ingredient | null;
  dish: Dish = new Dish(null, null, [], null, null);
  isSetDishInfo = false;
  isLoading = false;
  dishInfo: IDishInfo;
  hideOverview = false;
  ingredients$ = new BehaviorSubject([]);

  constructor(
    private sortService: SortService,
    private operationService: OperationsService,
    private dishesService: DishesService,
    private patchService: PatchService,
    private stateService: StateService
    ) { }

    ngOnChanges(): void {
      this.patchService.clearPatch();
      this.isLoading = true;
      this.dishesService.getOneDish(this.dish_id)
      .subscribe((dish: Dish) => {
          this.dish = dish;
          this.ingredients$.next(this.dish.ingredients);
          this.dishInfo = { name: dish.name, category: dish.category };
          this.isSetDishInfo = true;
          this.isLoading = false;
      })
    }

  setInfo(dishInfo: IDishInfo): void {
    this.dishInfo = dishInfo;
    this.isSetDishInfo = true;
    // Patching changes
    this.patchService.toPatch('replace', '/name', dishInfo.name);
    this.patchService.toPatch('replace', '/category', dishInfo.category);
  }

  setGrams(ingredient: IngredientForDish): void {
    this.expandedIngredient = null;
    this.dish.cost = this.operationService.calculateCost(this.dish.ingredients);
    // Patching changes
    this.patchService.toPatch('replace', '/ingredients/' + ingredient.ingredient_id, ingredient.gPP);
  }

  removeIngredient(ingredient: IngredientForDish) {
    this.expandedIngredient = null;
    this.dish.ingredients = this.dish.ingredients.filter((value: IngredientForDish) => value !== ingredient);
    this.ingredients$.next(this.dish.ingredients);
    this.dish.cost = this.operationService.calculateCost(this.dish.ingredients);
    // Patching changes
    this.patchService.toPatch('remove', '/ingredients/' + ingredient.ingredient_id);
  }

  infoToggler(e: Event) {
    this.hideOverview ? this.hideOverview = false : this.hideOverview = true;
  }

  addIngredient(ingredient: IngredientForDish): void {
    this.dish.ingredients = [...this.dish.ingredients, ingredient];
    this.ingredients$.next(this.dish.ingredients);
    this.dish.ingredients = this.sortService.sortList(this.dish.ingredients);
    this.dish.cost = this.operationService.calculateCost(this.dish.ingredients);
    // Patching changes
    this.patchService.toPatch('add', '/products/' + ingredient.product_id, ingredient.gPP);
  }

  submitDish(): void {
    if (this.dish_id === undefined) {
      this.dish.name = this.dishInfo.name;
      this.dish.category = this.dishInfo.category;
      this.stateService.add(this.dish);
      this.init.emit(true);
    } else {
      // Patching cost
      this.patchService.toPatch('replace', '/cost', this.dish.cost);
      this.patchService.savePatch(this.dish_id);
      this.init.emit(true);
    }
  }

}
