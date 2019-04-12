import { Component, OnInit } from '@angular/core';
import { Supplier } from './models/supplier.model';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { StateService } from './services/state.service';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({opacity: 0})),
      state('expanded', style({opacity: 1})),
      transition('expanded <=> collapsed', animate(300)),
    ]),
  ]
})
export class SuppliersComponent implements OnInit {

  columnsToDisplay = ['name', 'email', 'phone', 'comertial'];
  expandedSupplier: Supplier;
  suppliers$ = this.stateService.suppliersSubject;
  dataSource: Supplier[];

  constructor(private stateService: StateService) { }

  ngOnInit() {
    this.stateService.get();
  }

  hideUnexpanded(supplier: Supplier): void {
    // Copy the value of all list and emits a new value with just the selected supplier for visualization
    this.dataSource = [...this.suppliers$.value];
    this.suppliers$.next([supplier]);
  }

  close() {
    this.expandedSupplier = null;
    this.suppliers$.next(this.dataSource);
  }

}

