import { Component, EventEmitter, Output, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Dish } from '../models/dish.model';
import { DeleteDashboardDialogComponent } from './delete-dashboard-dialog/delete-dashboard-dialog.component';
import { PdfRenderService } from '../../../core/http/pdf-render.service';
import { StateService } from '../services/state.service';
import { trigger, transition, useAnimation } from '@angular/animations';
import { fadeInOut } from 'src/app/animations/navigation-animations';

@Component({
  selector: 'app-dishes-dashboard',
  templateUrl: './dishes-dashboard.component.html',
  styleUrls: ['./dishes-dashboard.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition('* <=> void', [useAnimation(fadeInOut, { params: { time: '.5s' } })])
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
    // this.pdfRender.dishPDF(dish);
  }

}
