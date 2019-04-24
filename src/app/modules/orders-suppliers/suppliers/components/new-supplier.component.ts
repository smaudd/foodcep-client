import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { StateService } from '../state.service';
import { Supplier } from '../models/supplier.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-supplier',
  template: `
    <mat-card style="padding: 20px; margin-top: 10px; margin-bottom: 10px" class="mat-elevation-z2">
      <app-supplier-form (postSupplier)="post($event)"></app-supplier-form>
    </mat-card>
  `,
})
export class NewSupplierComponent implements OnInit {

  @Output() done = new EventEmitter();
  constructor(private stateService: StateService, private router: Router) { }

  ngOnInit() {
  }

  post(supplier: Supplier) {
    this.stateService.post(supplier);
    this.done.emit(true);
  }

}
