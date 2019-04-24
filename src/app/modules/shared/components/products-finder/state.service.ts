import { Injectable } from '@angular/core';

import { SortService } from 'src/app/modules/shared/services/sort.service';
import { BehaviorSubject } from 'rxjs';
import { ProductsService } from '../../../../core/http/products-data-service/products-get-data.service';
import { Ingredient } from 'src/app/modules/shared/models/ingredient.model';

interface Data {
  data: Ingredient[];
  total_sum: number;
}

@Injectable({
  providedIn: 'root'
})
export class StateService {

  constructor(
      public sortService: SortService,
      private productsService: ProductsService,
    ) {}

  ingredientsSubject = new BehaviorSubject([]);
  loadingSubject = new BehaviorSubject(null);
  errorsSubject = new BehaviorSubject(null);

  get(query?: string) {
    this.loadingSubject.next(true);
    this.productsService.getProducts(query)
    .subscribe((data: Data) => {
      this.loadingSubject.next(false);
      this.ingredientsSubject.next(data.data);
    }, err => {
      if (err.status === 500) {
        // For server errors navigate to problems route
        // this.router.navigate(['/']);
      } else {
        // Not found or empty stream errors
        this.ingredientsSubject.next([]);
        this.loadingSubject.next(false);
        this.errorsSubject.next(err.status);
      }
    });
  }
}
