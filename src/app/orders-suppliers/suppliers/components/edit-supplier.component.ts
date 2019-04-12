import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Supplier } from '../models/supplier.model';
import { StateService } from '../services/state.service';

@Component({
  selector: 'app-edit-supplier',
  template: `
          <div>
            <form [formGroup]="supplierForm" fxLayout="column" (ngSubmit)="update(supplierForm.value)">
              <mat-form-field>
                  <input matInput type="text" autocomplete="off" placeholder="Name" formControlName="name">
                  <mat-error *ngIf="name.hasError('required')">Name is required</mat-error>
                  <mat-error *ngIf="name.hasError('pattern')">Only letters and spaces allowed</mat-error>
              </mat-form-field>

              <mat-form-field>
                  <input matInput type="text" autocomplete="off" placeholder="Email" formControlName="email">
                  <mat-error *ngIf="email.hasError('required')">Email is required</mat-error>
                  <mat-error *ngIf="email.hasError('email')">Correct Email</mat-error>
              </mat-form-field>

              <mat-form-field>
                  <input matInput autocomplete="off" placeholder="Telephone" formControlName="phone">
                  <mat-error *ngIf="phone.hasError('required')">Phone is required</mat-error>
                  <mat-error *ngIf="phone.hasError('pattern')">At least 6 max 9. Only numbers</mat-error>
              </mat-form-field>

              <mat-form-field>
                  <input matInput type="text" autocomplete="off" placeholder="Comertial" formControlName="comertial">
                  <mat-error *ngIf="comertial.hasError('required')">Comertial is required</mat-error>
                  <mat-error *ngIf="comertial.hasError('pattern')">Only letters and spaces allowed</mat-error>
              </mat-form-field>

              <div align="end">
                <button mat-icon-button *ngIf="supplierForm.valid && supplierForm.dirty">
                      <mat-icon color="warn">check</mat-icon>
                </button>
                <button mat-icon-button>
                      <mat-icon color="warn">delete</mat-icon>
                </button>
              </div>
              <br>
            </form>
          </div>
  `,
})
export class EditSupplierComponent implements OnChanges {


  get name() {
    return this.supplierForm.get('name');
  }
  get email() {
    return this.supplierForm.get('email');
  }
  get phone() {
    return this.supplierForm.get('phone');
  }
  get comertial() {
    return this.supplierForm.get('comertial');
  }

  @Input() supplier: Supplier;
  @Output() init = new EventEmitter();
  supplierForm: FormGroup;

  constructor(private fb: FormBuilder, private stateService: StateService) {
    this.supplierForm = this.fb.group({
      name: new FormControl('', [Validators.required, , Validators.pattern('[a-zA-Z-áéíóúñ ]*')]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required, Validators.pattern('[0-9]{6,9}')]),
      comertial: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z-áéíóúñ ]*')]),
    });
   }

  ngOnChanges() {
        this.supplierForm.get('name').setValue(this.supplier.name);
        this.supplierForm.get('email').setValue(this.supplier.email);
        this.supplierForm.get('phone').setValue(this.supplier.phone);
        this.supplierForm.get('comertial').setValue(this.supplier.comertial);
  }

  update(supplierForm: Supplier) {
    const supplier = new Supplier(supplierForm.name, supplierForm.email, supplierForm.phone, supplierForm.comertial, this.supplier._id);
    this.stateService.put(supplier);
    this.init.emit(true);
  }

}

