import { Component, Output, EventEmitter, Input, OnDestroy, OnInit } from '@angular/core';

import { IngredientForDish } from '../../models/ingredient-for-dish.model';
import { Ingredient } from '../../models/ingredient.model';
import { FormControl } from '@angular/forms';
import { SnackbarService } from 'src/app/modules/shared/services/snackbar.service';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { StateService } from './state.service';
import { FilterCorrectFormatService } from '../../services/filter-correct-format.service';

import { Subscription } from 'rxjs';
import { fader, fadeInOut } from 'src/app/animations/navigation-animations';
import { trigger, transition, useAnimation } from '@angular/animations';

@Component({
  selector: 'app-products-finder',
  templateUrl: './products-finder.component.html',
  styleUrls: ['./products-finder.component.css'],
  animations: [
      trigger('fadeInOut', [
      transition('* <=> void', [useAnimation(fadeInOut, { params: { time: '.2s' } })])
    ])
  ]
})
export class ProductsFinderComponent implements OnInit, OnDestroy {

  _shopping: boolean;
  subscription: Subscription;
  @Output() add = new EventEmitter(true);
  ingredientsSubject$ = this.stateService.ingredientsSubject;
  errorsSubject$ = this.stateService.errorsSubject;
  loadingSubject$ = this.stateService.loadingSubject;
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
      const expression = new RegExp('[A-za-zñáéíóúü ]');
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
        if (value === null || value === '' || !expression.test(value)) {
          this.ingredientsSubject$.next([]);
        } else {
          this.notFound = false;
          this.stateService.get(`?product=${value}&&page=0`);
        }
      });
  }

  addIngredientToDish(ingredient: IngredientForDish): void {
    this.add.emit(ingredient);
    this.ingredientsSubject$.next([]);
    this.search.reset();
  }

  addIngredientToShopping(ingredient: Ingredient): void {
    this.add.emit(ingredient);
    this.ingredientsSubject$.next([]);
    this.search.reset();
  }

}
