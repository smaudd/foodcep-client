import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Supplier } from '../models/supplier.model';
import { StateService } from '../state.service';

@Component({
  selector: 'app-supplier-form',
  template: `
          <div>
            <form [formGroup]="supplierForm" fxLayout="column" (ngSubmit)="supplier !== undefined ? put(supplierForm.value) : post(supplierForm.value)">
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

              <div align="end" *ngIf="supplier !== undefined">
                <button mat-icon-button type="submit" *ngIf="supplierForm.valid && supplierForm.dirty">
                      <mat-icon color="warn">check</mat-icon>
                </button>
                <button mat-icon-button type="button" (click)="delete()">
                      <mat-icon color="warn">delete</mat-icon>
                </button>
              </div>
              <div align="end" *ngIf="supplier === undefined">
                <button mat-button type="submit" [disabled]="supplierForm.invalid">Submit</button>
              </div>
              <br>
            </form>
          </div>
  `,
})
export class SupplierFormComponent implements OnChanges {


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
  @Output() putSupplier = new EventEmitter();
  @Output() postSupplier = new EventEmitter();
  @Output() deleteSupplier = new EventEmitter();
  @Output() toggleNew = new EventEmitter;
  supplierForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.supplierForm = this.fb.group({
      name: new FormControl('', [Validators.required, , Validators.pattern('[a-zA-Z-áéíóúñ ]*')]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required, Validators.pattern('[0-9]{6,12}')]),
      comertial: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z-áéíóúñ ]*')]),
    });
   }

  ngOnChanges() {
    if (this.supplier !== undefined) {
        this.supplierForm.get('name').setValue(this.supplier.name);
        this.supplierForm.get('email').setValue(this.supplier.email);
        this.supplierForm.get('phone').setValue(this.supplier.phone);
        this.supplierForm.get('comertial').setValue(this.supplier.comertial);
    }
  }

  put(supplierForm: Supplier) {
      const supplier = new Supplier(supplierForm.name, supplierForm.email, supplierForm.phone, supplierForm.comertial, this.supplier.supplier_id);
      this.putSupplier.emit(supplier);
  }

  post(supplierForm: Supplier) {
    const supplier = new Supplier(supplierForm.name, supplierForm.email, supplierForm.phone, supplierForm.comertial);
    this.postSupplier.emit(supplier);
  }

  delete() {
    this.deleteSupplier.emit(this.supplier);
  }

  toggle() {
    this.toggleNew.emit(false);
  }

}
