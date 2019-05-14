import { Injectable } from '@angular/core';

import { Dish } from '../models/dish.model';
import { BehaviorSubject } from 'rxjs';
import { PatchDishService } from '../../../core/http/dishes-data-service/dishes-patch-data.service';
import { DeleteDishService } from '../../../core/http/dishes-data-service/dishes-delete-data.service';
import { DishesService } from '../../../core/http/dishes-data-service/dishes-get-data.service';
import { PostDishService } from '../../../core/http/dishes-data-service/dishes-post-data.service';

interface IPatch {
  op: string,
  path: string,
  value: string | number
}

@Injectable({
  providedIn: 'root'
})
export class StateService {

    dishesSubject = new BehaviorSubject(null);
    dishSubject = new BehaviorSubject(null);
    loadingSubject = new BehaviorSubject(null);

    constructor(
        private postDishService: PostDishService,
        private updateService: PatchDishService,
        private deleteService: DeleteDishService,
        private getService: DishesService
    ) {
    }

    get() {
        this.dishesSubject.next(null);
        this.loadingSubject.next(true);
        this.getService.getDishes()
        .subscribe(dishesList => {
            this.dishesSubject.next(dishesList);
            this.loadingSubject.next(false);
        });
    }

    getOne(dish_id: number) {
      this.loadingSubject.next(true);
      this.getService.getOneDish(dish_id)
      .subscribe(dish => {
        this.dishSubject.next(dish);
        this.loadingSubject.next(false);
      })
    }

    add(dish: Dish) {
        this.postDishService.postDish(dish)
        .subscribe(response => {
            this.dishesSubject.next([...this.dishesSubject.value, response]);
        });
    }

    patch(patchArray: IPatch[], dish_id: number) {
        this.loadingSubject.next(true);
        this.updateService.patchDish(patchArray, dish_id)
        .subscribe(response => {
            const list = this.dishesSubject.value.filter(item => item.dish_id !== response.dish_id);
            this.dishesSubject.next([...list, response]);
            this.loadingSubject.next(false);
        });
    }

    delete(dish_id: number) {
        this.deleteService.deleteDish(dish_id)
        .subscribe(response => {
            const list = this.dishesSubject.value.filter(item => item.dish_id !== response.dish_id);
            this.dishesSubject.next(list);
        });
    }
}
