import { NgModule } from '@angular/core';
import { MaterialModule } from '../../material.module';

import { SharedModule } from '../shared/shared.module';
import { AddProductComponent } from './products-list/add-product/add-product.component';
import { ProductsManagerComponent } from './products-manager.component';
import { EditProductComponent } from './products-list/edit-product/edit-product.component';
import { EditDialogComponent } from './products-list/edit-product/edit-dialog/edit-dialog.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { DeleteDialogComponent } from './products-list/edit-product/delete-dialog/delete-dialog.component';
import { AddCategoryComponent } from './categories-list/add-category/add-category.component';
import { CategoriesListComponent } from './categories-list/categories-list.component';
import { EditCategoryComponent } from './categories-list/edit-category/edit-category.component';
import { EditCategoryDialogComponent } from './categories-list/edit-category/edit-category-dialog/edit-category-dialog.component';
import { DeleteCategoryDialogComponent } from './categories-list/edit-category/delete-category-dialog/delete-category-dialog.component';

import { RegistreRoutingModule } from './products-routing.module';


@NgModule({
  declarations: [
    AddProductComponent,
    ProductsManagerComponent,
    EditProductComponent,
    EditDialogComponent,
    ProductsListComponent,
    DeleteDialogComponent,
    AddCategoryComponent,
    CategoriesListComponent,
    EditCategoryComponent,
    EditCategoryDialogComponent,
    DeleteCategoryDialogComponent,
    ],
  imports: [
    SharedModule,
    MaterialModule,
    RegistreRoutingModule
  ],
  entryComponents: [ EditDialogComponent, DeleteDialogComponent, EditCategoryDialogComponent, DeleteCategoryDialogComponent ],
})
export class ProductsModule { }
