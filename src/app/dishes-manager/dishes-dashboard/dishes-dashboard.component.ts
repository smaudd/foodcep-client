import { Component, EventEmitter, Output, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material';

import { Dish } from '../models/dish.model';
import { DeleteDashboardDialogComponent } from './delete-dashboard-dialog/delete-dashboard-dialog.component';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { PdfRenderService } from 'src/app/shared/services/pdf-render.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { StateService } from '../services/state.service';

@Component({
  selector: 'app-dishes-dashboard',
  templateUrl: './dishes-dashboard.component.html',
  styleUrls: ['./dishes-dashboard.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({opacity: 0})),
      transition('void <=> *', animate(500)),
    ])
  ]
})
export class DishesDashboardComponent implements OnInit {

  @Output() loadEditor = new EventEmitter();
  @Input() firstInit: boolean;
  dishesList: Dish[];
  dishesSubject$ = this.stateService.dishesSubject;
  loadingSubject$ = this.stateService.loadingSubject;
  loadedDish: Dish;
  changes: boolean;

  constructor(
    private pdfRender: PdfRenderService,
    private dialog: MatDialog,
    private snackBar: SnackbarService,
    private stateService: StateService
    ) { }

  ngOnInit() {
    if (this.firstInit) {
    this.stateService.get();
    }
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
