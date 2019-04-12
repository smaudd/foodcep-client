import { Component, Input, SimpleChanges, OnChanges, EventEmitter, Output } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { IngredientForDish } from '../../shared/models/ingredient-for-dish.model';
import { Dish } from '../models/dish.model';
import { Ingredient } from '../../shared/models/ingredient.model';

import { SortService } from 'src/app/shared/services/sort.service';
import { OperationsService } from './services/operations.service';
import { IDishInfo } from './dishInfo.interface';
import { StateService } from '../services/state.service';
import { DataSource } from '@angular/cdk/table';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-dish-overview',
  templateUrl: './dish-overview.component.html',
  styleUrls: ['./dish-overview.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px'})),
      state('expanded', style({height: '*'})),
      transition('collapsed <=> expanded', animate('225ms cubic-bezier(1, 1, 1, 1)')),
    ]),
    trigger('fadeInOut', [
      state('void', style({opacity: 0})),
      transition('void <=> *', animate(200)),
    ])
  ]
})
export class DishOverviewComponent implements OnChanges {

  @Input() dish: Dish;
  @Input() id: string = undefined;
  @Output() init = new EventEmitter();
  columnsToDisplay = ['name', 'gPP', 'pPP'];
  expandedIngredient: Ingredient | null;
  data$ = new BehaviorSubject([]);
  isSetDishInfo = false;
  total: number;
  dishInfo: IDishInfo;
  hideOverview = true;

  constructor(
    private sortService: SortService,
    private operationService: OperationsService,
    private stateService: StateService
    ) {}

    ngOnChanges(changes: SimpleChanges) {
      if (this.id !== undefined) {
              this.dishInfo = {
                name: this.dish.name,
                category: this.dish.category
              };
              this.setInfo(this.dishInfo);
              this.hideOverview = false;
              this.isSetDishInfo = true;
              this.total = this.dish.total;
              this.data$.next(this.dish.ingredients);
      }
    }

  setInfo(dishInfo: IDishInfo) {
    this.dishInfo = dishInfo;
  }

  setGrams(changes: any) {
    this.expandedIngredient = null;
    const index = this.data$.value.indexOf(changes.ingredient);
    this.data$.value[index].pPP = this.operationService.calculatePPP(changes.ingredient, changes.gPP);
    this.total = this.operationService.calculateTotal(this.data$.value);
  }

  removeIngredient(ingredient: IngredientForDish) {
    this.expandedIngredient = null;
    const splice = this.data$.value.filter((value: IngredientForDish) => value !== ingredient);
    this.data$.next(splice);
    this.total = this.operationService.calculateTotal(this.data$.value);
  }

  infoToggler(e: Event) {
    this.hideOverview ? this.hideOverview = false : this.hideOverview = true;
  }

  addIngredient(ingredient): void {
    console.log(ingredient);
    this.data$.value.push(ingredient);
    this.data$.next(this.sortService.sortList(this.data$.value));
    this.data$.next([...this.data$.value]);
    this.total = this.operationService.calculateTotal(this.data$.value);
  }

  submitDish(): void {
    if (this.id === undefined) {
      const dish = new Dish(this.dishInfo.name, this.dishInfo.category, this.data$.value, this.total);
      this.stateService.add(dish);
      this.init.emit(true);
    } else {
      const dish = new Dish(this.dishInfo.name, this.dishInfo.category, this.data$.value, this.total, this.dish._id);
      this.stateService.update(dish);
      this.init.emit(true);
    }
  }

}
