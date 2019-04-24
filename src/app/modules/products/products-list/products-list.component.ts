import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material';
import { transition, trigger, useAnimation } from '@angular/animations';

import { Ingredient } from '../../shared/models/ingredient.model';

import { PdfRenderService } from '../../../core/http/pdf-render.service';
import { StateService } from './state.service';
import { StateService as CategoriesStateService } from '../categories-list/state.service';
import { tap, distinctUntilChanged, debounceTime, map } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { FilterCorrectFormatService } from '../../shared/services/filter-correct-format.service';
import { Subscription } from 'rxjs';
import { tableFadeInOut, fadeInOut } from '../../../animations/navigation-animations';


@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
  animations: [
    trigger('detailExpand', [
      transition('expanded <=> collapsed', [useAnimation(tableFadeInOut, { params: { time: '.5s'} })]),
    ]),
    trigger('fadeInOut', [
      transition('void <=> *', [useAnimation(fadeInOut, { params: { time: '1s'} })]),
    ])
  ]
})

export class ProductsListComponent implements OnInit, OnDestroy {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  ingredients: Ingredient[];
  columnsToDisplay = ['name', 'category', 'pPK', 'finalPrice'];
  expandedIngredient: Ingredient | null;
  collapsedIngredient: any;
  dataSource = [];
  emptyCollection: boolean;
  notFound: boolean;
  search = new FormControl;
  subscription: Subscription;
  tableSubject$ = this.stateService.ingredientsSubject;
  totalSubject$ = this.stateService.totalSumSubject;
  categoriesSubject$ = this.categoriesStateService.categoriesSubject;
  loadingSubject$ = this.stateService.loadingSubject;
  errorsSubject$ = this.stateService.errorsSubject;

  constructor(
    private stateService: StateService,
    private categoriesStateService: CategoriesStateService,
    private pdfRender: PdfRenderService,
    private filterCorrectFormat: FilterCorrectFormatService
    ) {
  }

  ngOnInit() {
    this.stateService.get('?product=&&page=0');
    this.dataStore();
    this.dataStoreErrors();
    this.searchBox();
    this.subscription = this.totalSubject$.subscribe(value => this.paginator.length = value);
  }

  hideUnexpanded(ingredient: any) {
    this.dataSource = [ingredient];
  }

  cancel() {
    this.expandedIngredient = null;
    this.dataSource = this.tableSubject$.value;
  }

  handlePaginator(e: any) {
    this.stateService.get(`?product=&&page=${e.pageIndex}`);
  }

  dataStore() {
    this.subscription = this.tableSubject$
    .pipe(
      tap(value => {
        this.emptyCollection = false;
        this.notFound = false;
        this.dataSource = value;
        this.expandedIngredient = null;
      })
    ).subscribe(value => {
        if (value.length === 0) {
          this.emptyCollection = true;
          return;
        }
    });
  }

  dataStoreErrors() {
    this.subscription = this.errorsSubject$.
    pipe(
      tap(status => {
        (status === 400) ? this.emptyCollection = true : this.notFound = true;
      })
    ).subscribe();
  }

  searchBox() {
    this.subscription = this.search.valueChanges
    .pipe(
      map(value => {
        // Titlecase service
        value = this.filterCorrectFormat.filterInput(value);
        return value;
      }),
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(value => {
      if (value === '') {
        this.stateService.get('?product=&&page=0');
      } else {
        this.stateService.get(`?product=${value}&&page=0`);
      }
    });
  }

  // pdf() {
  //   this.pdfRender.ingredientsPDF(this.categoriesSubject$.value);
  // }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
