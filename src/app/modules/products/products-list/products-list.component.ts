import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material';
import { transition, trigger, useAnimation } from '@angular/animations';

import { Ingredient } from '../../shared/models/ingredient.model';

import { PdfRenderService } from '../../shared/services/pdf-render.service';
import { StateService } from './state.service';
import { StateService as CategoriesStateService } from '../categories-list/state.service';
import { distinctUntilChanged, debounceTime, map, skip } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { FilterCorrectFormatService } from '../../shared/services/filter-correct-format.service';
import { Subscription } from 'rxjs';
import { tableFadeInOut, fader } from '../../../animations/navigation-animations';
import { BreakpointObserver } from '@angular/cdk/layout';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
  animations: [
    trigger('detailExpand', [
      transition('expanded <=> collapsed', [useAnimation(tableFadeInOut, { params: { time: '.5s'} })]),
    ]),
   fader
  ]
})

export class ProductsListComponent implements OnInit, OnDestroy {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  ingredients: Ingredient[];
  columnsToDisplay = ['name', 'category', 'pPK', 'finalPrice'];
  expandedIngredient: Ingredient | null;
  currency = this.cookieService.get('CURRENCY');
  collapsedIngredient: any;
  search = new FormControl;
  subscription: Subscription;
  data: Ingredient[];
  productsSubject$ = this.stateService.productsSubject;
  totalSubject$ = this.stateService.totalSumSubject;
  categoriesSubject$ = this.categoriesStateService.categoriesSubject;
  loadingSubject$ = this.stateService.loadingSubject;
  notFoundSubject$ = this.stateService.notFoundSubject;

  constructor(
    private stateService: StateService,
    private categoriesStateService: CategoriesStateService,
    private pdfRender: PdfRenderService,
    private filterCorrectFormat: FilterCorrectFormatService,
    private breakpointObserver: BreakpointObserver,
    private cookieService: CookieService
    ) {
      // Handles columns to display dependient on the screen size
      this.subscription = this.breakpointObserver.observe([
        '(max-width: 768px)'
      ]).subscribe(result => {
        if (result.matches) {
          this.columnsToDisplay = ['name', 'finalPrice'];
        } else {
          this.columnsToDisplay = ['name', 'category', 'pPK', 'finalPrice'];
        }
      })
     }

  ngOnInit() {
    this.stateService.get('?product=&&page=0');
    this.searchBox();
    this.subscription = this.totalSubject$.pipe(skip(1)).subscribe(value => this.paginator.length = value);
    this.subscription = this.productsSubject$.subscribe(value => this.data = value);
  }

  hideUnexpanded(ingredient: any) {
    this.data = [ingredient];
  }

  cancel() {
    this.expandedIngredient = null;
    console.log(this.expandedIngredient);
    this.data = [...this.productsSubject$.value];
  }

  handlePaginator(e: any) {
    this.stateService.get(`?product=&&page=${e.pageIndex}`);
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

  pdf() {
    this.pdfRender.productsPDF(this.categoriesSubject$.value);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
