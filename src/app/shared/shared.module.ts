import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

import { MaterialModule } from '../material.module';
import { trigger, state, style, transition, animate } from '@angular/animations';

import { FlexLayoutModule } from '@angular/flex-layout';

import { IngredientsListComponent } from './ingredients-list/ingredients-list.component';
import { NavComponent } from '../nav/nav.component';
import { DishTableComponent } from './ingredients-list/dish-table.component';
import { ShoppingTableComponent } from './ingredients-list/shopping-table.component';


@NgModule({
  declarations: [
    NavComponent,
    IngredientsListComponent,
    DishTableComponent,
    ShoppingTableComponent
  ],
  imports: [
    TranslateModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CommonModule,
    RouterModule
  ],
  exports: [ NavComponent,
             TranslateModule,
             IngredientsListComponent,
             CommonModule,
             FormsModule,
             FlexLayoutModule,
             HttpClientModule,
             MaterialModule,
             ReactiveFormsModule,
            ],
})

export class SharedModule { }
