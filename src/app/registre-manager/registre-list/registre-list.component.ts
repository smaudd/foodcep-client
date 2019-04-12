import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { Ingredient } from '../../shared/models/ingredient.model';

import { PdfRenderService } from '../../shared/services/pdf-render.service';
import { StateService } from './state.service';
import { StateService as CategoriesStateService } from '../categories-list/state.service';
import { tap, distinctUntilChanged, debounceTime, map } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { FilterCorrectFormatService } from 'src/app/shared/services/filter-correct-format.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-registre-list',
  templateUrl: './registre-list.component.html',
  styleUrls: ['./registre-list.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({opacity: 0})),
      state('expanded', style({opacity: 1})),
      transition('expanded <=> collapsed', animate(300)),
    ]),
    trigger('fadeInOut', [
      state('void', style({opacity: 0})),
      transition('void <=> *', animate(200)),
    ])
  ]
})

export class RegistreListComponent implements OnInit, OnDestroy {

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
    this.stateService.get('?amount=5&&page=0');
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
    this.stateService.get(`?amount=5&&page=${e.pageIndex}`);
  }

  dataStore() {
    this.tableSubject$
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
    this.errorsSubject$.
    pipe(
      tap(status => {
        (status === 400) ? this.emptyCollection = true : this.notFound = true;
      })
    ).subscribe();
  }

  searchBox() {
    this.search.valueChanges
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
        this.stateService.get('?amount=5&&page=0');
      } else {
        this.stateService.get(`?ingredient=${value}&&amount=5`);
      }
    });
  }

  pdf() {
    this.pdfRender.ingredientsPDF(this.categoriesSubject$.value);
  }

  ngOnDestroy() {
    // this.tableSubject$.unsubscribe();
    // this.categoriesSubject$.unsubscribe();
    // this.loadingSubject$.unsubscribe();
    // this.totalSubject$.unsubscribe();
    this.subscription.unsubscribe();
  }

}
