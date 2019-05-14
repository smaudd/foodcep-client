import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Supplier } from '../models/supplier.model';
import { MatDialog } from '@angular/material';
import { DeleteSupplierDialogComponent } from './delete-supplier-dialog.component';

@Component({
  selector: 'app-supplier-form',
  template: `
          <div>
            <form [formGroup]="supplierForm" fxLayout="column" (ngSubmit)="supplier !== undefined ? put(supplierForm.value) : post(supplierForm.value)">
              <mat-form-field appearance="outline">
                  <input matInput type="text" autocomplete="off" placeholder="{{'AUTH.NAME'|translate}}" formControlName="name">
                  <mat-error *ngIf="name.hasError('required')">
                    <span translate>AUTH.NAME-REQUIRED</span>
                  </mat-error>
                  <mat-error *ngIf="name.hasError('pattern')">
                    <span translate>AUTH.ONLY-LETTERS</span>
                  </mat-error>
              </mat-form-field>

              <mat-form-field appearance="outline">
                  <input matInput type="text" autocomplete="off" placeholder="Email" formControlName="email">
                  <mat-error *ngIf="email.hasError('required')">
                    <span translate>AUTH.EMAIL-REQUIRED</span>
                  </mat-error>
                  <mat-error *ngIf="email.hasError('email')">
                    <span translate>AUTH.VALID-EMAIL</span>
                  </mat-error>
              </mat-form-field>

              <mat-form-field appearance="outline">
                  <input matInput autocomplete="off" placeholder="{{'AUTH.PHONE'|translate}}" formControlName="phone">
                  <mat-error *ngIf="phone.hasError('required')">
                    <span translate>AUTH.PHONE-REQUIRED</span>
                  </mat-error>
              </mat-form-field>

              <mat-form-field appearance="outline">
                  <input matInput type="text" autocomplete="off" placeholder="{{'ORDERS.COMERTIAL' | translate}}" formControlName="comertial">
                  <mat-error *ngIf="comertial.hasError('required')">
                    <span translate>ORDERS.COMERTIAL-REQUIRED</span>
                  </mat-error>
                  <mat-error *ngIf="comertial.hasError('pattern')">
                    <span translate>AUTH.ONLY-LETTERS</span>
                  </mat-error>
              </mat-form-field>

              <div align="end" *ngIf="supplier !== undefined">
                <button mat-icon-button type="submit" *ngIf="supplierForm.valid && supplierForm.dirty">
                      <mat-icon color="warn">save</mat-icon>
                </button>
                <button mat-icon-button type="button" (click)="openDeleteDialog(supplierForm.value)">
                      <mat-icon color="warn">delete</mat-icon>
                </button>
              </div>
              <div align="end" *ngIf="supplier === undefined">
                <button mat-button type="submit" [disabled]="supplierForm.invalid">
                  <span translate>AUTH.SUBMIT</span>
                </button>
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

  constructor(private fb: FormBuilder, private dialog: MatDialog) {
    this.supplierForm = this.fb.group({
      name: new FormControl('', [Validators.required, , Validators.pattern('[a-zA-Z-áéíóúñ ]*'), Validators.maxLength(20)]),
      email: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(30)]),
      phone: new FormControl('', [Validators.required, Validators.pattern('[0-9]{9,12}'), Validators.maxLength(20)]),
      comertial: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z-áéíóúñ ]*'), Validators.maxLength(20)]),
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

  openDeleteDialog(supplierForm: Supplier) {
    const supplier = new Supplier(supplierForm.name, supplierForm.email, supplierForm.phone, supplierForm.comertial, this.supplier.supplier_id);
    this.postSupplier.emit(supplier);
    const dialogRef = this.dialog.open(DeleteSupplierDialogComponent, {
      data: supplier
    })
    dialogRef.afterClosed().subscribe(_ => {
      this.deleteSupplier.emit(this.supplier);
    })
  }

  toggle() {
    this.toggleNew.emit(false);
  }

}
