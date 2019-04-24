import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { SortService } from '../../shared/services/sort.service';
import { BehaviorSubject } from 'rxjs';
import { ProductsService } from '../../../core/http/products-data-service/products-get-data.service';
import { Category } from './models/category.model';
import { ProductPostService } from '../../../core/http/products-data-service/products-post-data.service';
import { ProductDeleteService } from '../../../core/http/products-data-service/products-delete-data.service';
import { ProductPutService } from '../../../core/http/products-data-service/products-put-data.service';
import { StateService as IngredientsStateService } from '../products-list/state.service';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  constructor(
      public sortService: SortService,
      private productsService: ProductsService,
      private productPostService: ProductPostService,
      private productDeleteService: ProductDeleteService,
      private productPutService: ProductPutService,
      private router: Router,
      private ingredientsStateService: IngredientsStateService
    ) {}

  categoriesSubject = new BehaviorSubject([]);
  errorsSubject = new BehaviorSubject(null);

  get() {
    this.productsService.getCategories()
    .subscribe(ingredients => {
      this.categoriesSubject.next(ingredients);
    }, err => {
      if (err.status === 500) {
        this.router.navigate(['/']);
      } else {
        this.errorsSubject.next(err.status);
      }
    });
  }

  post(category: Category): void {
      this.productPostService.postCategory(category)
      .subscribe(value => {
          const list = this.addToList(value, this.categoriesSubject.value);
          this.categoriesSubject.next(list);
      });
  }

  update(category: Category): void {
      this.productPutService.putCategoryData(category)
      .subscribe(value => {
          let list = this.removeFromList(value, this.categoriesSubject.value);
          list = this.addToList(value, list);
          this.categoriesSubject.next(list);
          // In case of update. Get the products again to actualize the table data
          this.ingredientsStateService.get('?product=&&page=0')
      });
  }

  delete(id: string): void {
      this.productDeleteService.deleteCategory(id)
      .subscribe(category => {
          const list = this.removeFromList(category, this.categoriesSubject.value);
          this.categoriesSubject.next(list);
      });
  }

  addToList(category: Category, list: Category[]): Category[] {
      list.push(category);
      list = this.sortService.sortList(list);
      return list;
  }

  removeFromList(category: Category, list: Category[]): Category[] {
      list = list.filter(value => category.category_id !== value.category_id);
      list = this.sortService.sortList(list);
      return list;
  }

}
