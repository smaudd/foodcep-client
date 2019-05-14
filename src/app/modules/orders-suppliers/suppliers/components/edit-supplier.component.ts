import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Supplier } from '../models/supplier.model';
import { StateService } from '../state.service';

@Component({
  selector: 'app-edit-supplier',
  template: `
          <div>
            <app-supplier-form [supplier]="supplier" (putSupplier)="update($event)" (deleteSupplier)="deleteSupplier()"></app-supplier-form>
          </div>
  `,
})
export class EditSupplierComponent implements OnChanges {

  @Input() supplier: Supplier;
  @Output() init = new EventEmitter();
  supplierForm: FormGroup;

  constructor(private stateService: StateService) {
   }

  ngOnChanges() {}

  update(supplierForm: Supplier) {
    const supplier = new Supplier(supplierForm.name, supplierForm.email, supplierForm.phone, supplierForm.comertial, this.supplier.supplier_id);
    this.stateService.put(supplier);
    this.init.emit(true);
  }

  deleteSupplier() {
    this.init.emit(true);
  }

}

