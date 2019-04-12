import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { SortService } from 'src/app/shared/services/sort.service';
import { BehaviorSubject } from 'rxjs';
import { IngredientsService } from '../../shared/services/ingredients.service';
import { Ingredient } from 'src/app/shared/models/ingredient.model';

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
      private ingredientsService: IngredientsService,
      private router: Router
    ) {}

  ingredientsSubject = new BehaviorSubject([]);
  loadingSubject = new BehaviorSubject(null);
  errorsSubject = new BehaviorSubject(null);

  get(query?: string) {
    this.loadingSubject.next(true);
    this.ingredientsService.getIngredients(query)
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
