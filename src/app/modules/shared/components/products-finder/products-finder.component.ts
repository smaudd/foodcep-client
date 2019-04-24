import { Component, Output, EventEmitter, Input, OnDestroy, OnInit } from '@angular/core';

import { IngredientForDish } from '../../models/ingredient-for-dish.model';
import { Ingredient } from '../../models/ingredient.model';
import { FormControl } from '@angular/forms';
import { SnackbarService } from 'src/app/modules/shared/services/snackbar.service';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { StateService } from './state.service';
import { FilterCorrectFormatService } from '../../services/filter-correct-format.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products-finder',
  templateUrl: './products-finder.component.html',
  styleUrls: ['./products-finder.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({opacity: 0})),
      transition('void <=> *', animate(100)),
    ])
  ]
})
export class ProductsFinderComponent implements OnInit, OnDestroy {

  _shopping: boolean;
  subscription: Subscription;
  @Output() add = new EventEmitter(true);
  ingredientsSubject$ = this.stateService.ingredientsSubject;
  errorsSubject$ = this.stateService.errorsSubject;
  search = new FormControl;
  notFound: boolean;

  get shopping() {
    return this._shopping;
  }

  @Input()
    set shopping(value: boolean) {
      this._shopping = value;
  }

  constructor(
    private stateService: StateService,
    private filterCorrectFormat: FilterCorrectFormatService,
    private snackBar: SnackbarService
    ) {}

  ngOnInit() {
    this.searchBox();
    this.subscription = this.errorsSubject$.subscribe(_ => this.notFound = true);
    this.notFound = false;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  searchBox() {
      this.subscription = this.search.valueChanges
      .pipe(
        map(value => {
            if (value) {
            return this.filterCorrectFormat.filterInput(value);
            }
            return value;
        }),
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe(value => {
        this.notFound = false;
        if (value === null || value === '') {
          this.ingredientsSubject$.next([]);
        } else {
          this.stateService.get(`?product=${value}&&page=0`);
        }
      });
  }

  addIngredientToDish(ingredient: IngredientForDish): void {
    this.add.emit(ingredient);
    this.snackBar.open('Added!', null, 'green-snackbar', 300);
    this.ingredientsSubject$.next([]);
    this.search.reset();
  }

  addIngredientToShopping(ingredient: Ingredient): void {
    this.add.emit(ingredient);
    this.ingredientsSubject$.next([]);
    this.search.reset();
  }

}
