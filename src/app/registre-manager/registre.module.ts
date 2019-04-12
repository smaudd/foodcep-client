import { NgModule } from '@angular/core';
import { MaterialModule } from '../material.module';

import { SharedModule } from '../shared/shared.module';
import { AddRegistreComponent } from './registre-list/add-registre/add-registre.component';
import { RegistreManagerComponent } from './registre-manager.component';
import { EditRegistreComponent } from './registre-list/edit-registre/edit-registre.component';
import { EditDialogComponent } from './registre-list/edit-registre/edit-dialog/edit-dialog.component';
import { RegistreListComponent } from './registre-list/registre-list.component';
import { DeleteDialogComponent } from './registre-list/edit-registre/delete-dialog/delete-dialog.component';
import { AddCategoryComponent } from './categories-list/add-category/add-category.component';
import { CategoriesListComponent } from './categories-list/categories-list.component';
import { EditCategoryComponent } from './categories-list/edit-category/edit-category.component';
import { EditCategoryDialogComponent } from './categories-list/edit-category/edit-category-dialog/edit-category-dialog.component';
import { DeleteCategoryDialogComponent } from './categories-list/edit-category/delete-category-dialog/delete-category-dialog.component';

import { RegistreRoutingModule } from './registre-routing.module';


@NgModule({
  declarations: [
    AddRegistreComponent,
    RegistreManagerComponent,
    EditRegistreComponent,
    EditDialogComponent,
    RegistreListComponent,
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
export class RegistreManagerModule { }
