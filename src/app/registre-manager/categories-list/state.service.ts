import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { SortService } from 'src/app/shared/services/sort.service';
import { BehaviorSubject } from 'rxjs';
import { IngredientsService } from '../../shared/services/ingredients.service';
import { Category } from '../models/category.model';
import { AddService } from '../services/add.service';
import { DeleteService } from '../services/delete.service';
import { EditService } from '../services/edit.service';

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

  categoriesSubject = new BehaviorSubject([]);
  errorsSubject = new BehaviorSubject(null);

  get() {
    this.ingredientsService.getCategories()
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
      this.addService.postCategory(category)
      .subscribe(value => {
          const list = this.addToList(value, this.categoriesSubject.value);
          this.categoriesSubject.next(list);
      });
  }

  update(category: Category): void {
      this.editService.putCategoryData(category)
      .subscribe(value => {
          let list = this.removeFromList(value, this.categoriesSubject.value);
          list = this.addToList(value, list);
          this.categoriesSubject.next(list);
      });
  }

  delete(id: string): void {
      this.deleteService.deleteCategory(id)
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
      list = list.filter(value => category._id !== value._id);
      list = this.sortService.sortList(list);
      return list;
  }

}
