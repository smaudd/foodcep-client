import { Component, EventEmitter, Output, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Dish } from '../models/dish.model';
import { DeleteDashboardDialogComponent } from './delete-dashboard-dialog/delete-dashboard-dialog.component';
import { PdfRenderService } from '../../shared/services/pdf-render.service';
import { StateService } from '../services/state.service';

import { Subscription } from 'rxjs';
import { skip, map } from 'rxjs/operators';
import { fader } from '../../../animations/navigation-animations';
import { CookieService } from 'ngx-cookie-service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-dishes-dashboard',
  templateUrl: './dishes-dashboard.component.html',
  styleUrls: ['./dishes-dashboard.component.css'],
  animations: [fader]
})
export class DishesDashboardComponent implements OnInit {

  @Output() loadEditor = new EventEmitter();
  @Input() firstInit: boolean;
  dishesList: Dish[];
  dishesSubject$ = this.stateService.dishesSubject;
  loadingSubject$ = this.stateService.loadingSubject;
  subscription: Subscription;
  loadedDish: Dish;
  changes: boolean;
  currency = this.cookieService.get('CURRENCY');
  lang = this.translateService.getDefaultLang();
  src = `assets/documentation/i18n/${this.lang}/manuals/dishes.md`;

  constructor(
    private pdfRender: PdfRenderService,
    private dialog: MatDialog,
    private stateService: StateService,
    private cookieService: CookieService,
    private translateService: TranslateService
    ) { }

  ngOnInit() {
    if (this.firstInit) {
    this.stateService.get();
    }
  }

  dashboardLength() {
    return this.subscription = this.dishesSubject$
    .pipe(
      skip(2),
      map((value: Dish[]) => {
        value.length;
        console.log(value.length)
      })
    ).subscribe();
  }

  selectDish(dish: Dish) {
    this.loadedDish = dish;
    this.loadEditor.emit(this.loadedDish);
  }

  openDeleteDialog(current: Dish): void {
    this.loadedDish = current;
    const dialogDeleteRef = this.dialog.open(DeleteDashboardDialogComponent, {
      width: '500px',
      data: current
    });
  }

  pdf(dish: Dish) {
    this.pdfRender.dishPDF(dish);
  }

}
