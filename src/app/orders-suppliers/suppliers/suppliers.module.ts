import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { SuppliersComponent } from './suppliers.component';
import { NewSupplierComponent } from './components/new-supplier.component';
import { EditSupplierComponent } from './components/edit-supplier.component';
import { OrdersSuppliersRoutingModule } from '../orders-suppliers-routing.module';

@NgModule({
  declarations: [
    SuppliersComponent,
    NewSupplierComponent,
    EditSupplierComponent
  ],
  imports: [
    OrdersSuppliersRoutingModule,
    SharedModule
  ],
  exports: [
      SuppliersComponent,
      // NewSupplierComponent,
      // EditSupplierComponent
  ]
})
export class SuppliersModule { }
