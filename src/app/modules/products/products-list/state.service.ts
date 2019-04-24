import { Injectable } from '@angular/core';

import { SortService } from '../../shared/services/sort.service';
import { BehaviorSubject } from 'rxjs';
import { ProductsService } from '../../../core/http/products-data-service/products-get-data.service';
import { Ingredient } from '../../shared/models/ingredient.model';
import { ProductPostService } from '../../../core/http/products-data-service/products-post-data.service';
import { ProductDeleteService } from '../../../core/http/products-data-service/products-delete-data.service';
import { ProductPutService } from '../../../core/http/products-data-service/products-put-data.service';

interface Data {
  data: Ingredient[];
  count: number;
}

@Injectable({
  providedIn: 'root'
})
export class StateService {

  constructor(
      public sortService: SortService,
      private productService: ProductsService,
      private productsPostService: ProductPostService,
      private productDeleteService: ProductDeleteService,
      private productPutService: ProductPutService
    ) {}

  ingredientsSubject = new BehaviorSubject([]);
  totalSumSubject = new BehaviorSubject(null);
  loadingSubject = new BehaviorSubject(null);
  errorsSubject = new BehaviorSubject(null);

  get(query?: string) {
    this.loadingSubject.next(true);
    this.productService.getProducts(query)
    .subscribe((data: Data) => {
      this.loadingSubject.next(false);
      this.ingredientsSubject.next(data.data);
      this.totalSumSubject.next(data.count);
    }, _ => {
      this.loadingSubject.next(false);
      this.errorsSubject.next(true);
    });
  }

  post(ingredient: Ingredient): void {
      this.productsPostService.postProduct(ingredient)
      .subscribe(val => {
          const list = this.addToList(val, this.ingredientsSubject.value);
          this.ingredientsSubject.next(list);
          // this.totalSumSubject.next(this.totalSumSubject.value + 1);
          this.get('?product=&&page=0');
      });
  }

  update(ingredient: Ingredient): void {
      this.productPutService.putProductData(ingredient)
      .subscribe(val => {
          let list = this.removeFromList(val, this.ingredientsSubject.value);
          list = this.addToList(val, list);
          this.ingredientsSubject.next(list);
      });
  }

  delete(id: string): void {
      this.productDeleteService.deleteIngredient(id)
      .subscribe(val => {
          const list = this.removeFromList(val, this.ingredientsSubject.value);
          this.ingredientsSubject.next(list);
          // this.totalSumSubject.next(this.totalSumSubject.value);
          // Actualize the page in order to keep 5 ingredients on it
          this.get('?product=&&page=0');
      });
  }

  addToList(ingredient: any, list: Ingredient[]): Ingredient[] {
      list.push(ingredient);
      list = this.sortService.sortList(list);
      return list;
  }

  removeFromList(ingredient: Ingredient, list: Ingredient[]): Ingredient[] {
      const filter = list.filter(value => ingredient.product_id !== value.product_id);
      list = this.sortService.sortList(list);
      return filter;
  }

}
