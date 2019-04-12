import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { SortService } from 'src/app/shared/services/sort.service';
import { BehaviorSubject } from 'rxjs';
import { IngredientsService } from '../../shared/services/ingredients.service';
import { Ingredient } from 'src/app/shared/models/ingredient.model';
import { AddService } from '../services/add.service';
import { DeleteService } from '../services/delete.service';
import { EditService } from '../services/edit.service';

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
      private addService: AddService,
      private deleteService: DeleteService,
      private editService: EditService,
      private router: Router
    ) {}

  ingredientsSubject = new BehaviorSubject([]);
  totalSumSubject = new BehaviorSubject(null);
  loadingSubject = new BehaviorSubject(null);
  errorsSubject = new BehaviorSubject(null);

  get(query?: string) {
    this.loadingSubject.next(true);
    this.ingredientsService.getIngredients(query)
    .subscribe((data: Data) => {
      this.loadingSubject.next(false);
      this.ingredientsSubject.next(data.data);
      this.totalSumSubject.next(data.total_sum);
    }, err => {
      if (err.status === 500) {
        this.router.navigate(['/']);
      } else {
        this.errorsSubject.next(err.status);
        this.loadingSubject.next(false);
      }
    });
  }

  post(ingredient: Ingredient): void {
      this.addService.postIngredient(ingredient)
      .subscribe(val => {
          const list = this.addToList(val, this.ingredientsSubject.value);
          this.ingredientsSubject.next(list);
          // this.totalSumSubject.next(this.totalSumSubject.value + 1);
          this.get('?amount=5&&page=0');
      });
  }

  update(ingredient: Ingredient): void {
      this.editService.putIngredientData(ingredient)
      .subscribe(val => {
          let list = this.removeFromList(val, this.ingredientsSubject.value);
          list = this.addToList(val, list);
          this.ingredientsSubject.next(list);
      });
  }

  delete(id: string): void {
      this.deleteService.deleteIngredient(id)
      .subscribe(val => {
          const list = this.removeFromList(val, this.ingredientsSubject.value);
          this.ingredientsSubject.next(list);
          // this.totalSumSubject.next(this.totalSumSubject.value);
          // Actualize the page in order to keep 5 ingredients on it
          this.get('?amount=5&&page=0');
      });
  }

  addToList(ingredient: any, list: Ingredient[]): Ingredient[] {
      list.push(ingredient);
      list = this.sortService.sortList(list);
      return list;
  }

  removeFromList(ingredient: Ingredient, list: Ingredient[]): Ingredient[] {
      const filter = list.filter(value => ingredient._id !== value._id);
      list = this.sortService.sortList(list);
      return filter;
  }

}
