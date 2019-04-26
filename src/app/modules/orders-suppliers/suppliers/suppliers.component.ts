import { Component, OnInit, OnDestroy } from '@angular/core';
import { Supplier } from './models/supplier.model';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { StateService } from './state.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';

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
export class SuppliersComponent implements OnInit, OnDestroy {

  columnsToDisplay = ['name', 'email', 'phone', 'comertial'];
  expandedSupplier: Supplier;
  suppliers$ = this.stateService.suppliersSubject;
  data: Supplier[];
  subscription: Subscription;
  newMenu: boolean;

  constructor(private stateService: StateService, private breakpointObserver: BreakpointObserver) {
    this.subscription = this.breakpointObserver.observe([
      '(max-width: 768px)'
    ]).subscribe(result => {
      if (result.matches) {
        this.columnsToDisplay = ['name', 'email'];
      } else {
        this.columnsToDisplay = ['name', 'email', 'phone', 'comertial'];
      }
    })
   }

  ngOnInit() {
    this.stateService.get();
    this.subscription = this.suppliers$
    .subscribe(suppliers => {
      this.data = suppliers;
    })
  }

  hideUnexpanded(supplier: Supplier): void {
    // Copy the value of all list and emits a new value with just the selected supplier for visualization
    this.data = [supplier];
  }

  close() {
    this.expandedSupplier = null;
    this.data = this.suppliers$.value;
  }

  // Toggle between the table of suppliers and NewSupplierComponent
  toggleNew() {
    this.newMenu ? this.newMenu = false : this.newMenu = true;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}

