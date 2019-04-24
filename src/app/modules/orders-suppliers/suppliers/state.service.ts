import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { SuppliersService } from '../../../core/http/suppliers-data-service/suppliers.service';
import { Supplier } from './models/supplier.model';
import { SortService } from '../../shared/services/sort.service';


@Injectable({
  providedIn: 'root'
})
export class StateService {

  suppliersSubject = new BehaviorSubject([]);
  supplierSubject = new BehaviorSubject(null);
  constructor(private suppliersService: SuppliersService, private sortService: SortService) {}

  get(): void {
    this.suppliersService.getSuppliers()
    .subscribe((suppliers: Supplier[]) => {
      this.suppliersSubject.next(suppliers);
    });
  }

  getOne(supplier_id: number): void {
    this.suppliersService.getOneSupplier(supplier_id)
    .subscribe((supplier: Supplier) => {
      this.supplierSubject.next(supplier);
    })
  }

  post(supplier: Supplier): void {
    this.suppliersService.postSupplier(supplier)
    .subscribe((newSupplier: Supplier) => {
      this.suppliersSubject.next([...this.suppliersSubject.value, newSupplier]);
    });
  }

  put(supplier: Supplier): void {
    this.suppliersService.putSupplier(supplier)
    .subscribe((editedSupplier: Supplier) => {
      let list = this.suppliersSubject.value.filter(sup => sup.supplier_id !== editedSupplier.supplier_id);
      list = [...list, editedSupplier];
      // Sort alphabetically
      list = this.sortService.sortList(list);
      this.suppliersSubject.next(list);
    });
  }

  delete(supplier: Supplier): void {
    this.suppliersService.deleteSupplier(supplier)
    .subscribe((deletedSupplier: Supplier) => {
      const list = this.suppliersSubject.value.filter(sup => sup.supplier_id !== deletedSupplier.supplier_id);
      this.suppliersSubject.next(list);
    });
  }

}
