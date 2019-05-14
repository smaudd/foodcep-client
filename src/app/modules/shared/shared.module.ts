import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { MarkdownModule } from 'ngx-markdown';

import { MaterialModule } from '../../material.module';

import { FlexLayoutModule } from '@angular/flex-layout';

import { ProductsFinderComponent } from './components/products-finder/products-finder.component';
import { DishTableComponent } from './components/products-finder/components/dish-table.component';
import { ShoppingTableComponent } from './components/products-finder/components/shopping-table.component';
import { GetStartedComponent } from 'src/app/core/home/home-layout/components/get-started.component';


@NgModule({
  declarations: [
    ProductsFinderComponent,
    DishTableComponent,
    ShoppingTableComponent,
    GetStartedComponent
  ],
  imports: [
    TranslateModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CommonModule,
    RouterModule,
    MarkdownModule.forChild()
  ],
  exports: [
             TranslateModule,
             ProductsFinderComponent,
             CommonModule,
             FormsModule,
             FlexLayoutModule,
             HttpClientModule,
             MaterialModule,
             ReactiveFormsModule,
             MarkdownModule,
             GetStartedComponent
            ],
})

export class SharedModule { }
