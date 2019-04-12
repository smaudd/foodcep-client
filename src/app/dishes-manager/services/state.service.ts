import { Injectable } from '@angular/core';

import { Dish } from '../models/dish.model';
import { BehaviorSubject } from 'rxjs';
import { UpdateDishService } from './update-dish.service';
import { DeleteDishService } from './delete-dish.service';
import { DishesService } from './dishes.service';
import { Router } from '@angular/router';
import { AddDishService } from './add-dish.service';


@Injectable({
  providedIn: 'root'
})
export class StateService {

    dishesSubject = new BehaviorSubject([]);
    loadingSubject = new BehaviorSubject(null);

    constructor(
        private router: Router,
        private addService: AddDishService,
        private updateService: UpdateDishService,
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
        }, _ => {
            // this.router.navigate(['/500']);
        });
    }

    add(dish: Dish) {
        this.addService.postDish(dish)
        .subscribe(response => {
            this.dishesSubject.next([...this.dishesSubject.value, response]);
        }, _ => {
            // this.router.navigate(['/500']);
        });
    }

    update(dish: Dish) {
        this.loadingSubject.next(true);
        this.updateService.putDish(dish)
        .subscribe(response => {
            const list = this.dishesSubject.value.filter(item => item.name !== response.name);
            this.dishesSubject.next([...list, dish]);
            this.loadingSubject.next(false);
        }, _ => {
            // this.router.navigate(['/500']);
        });
    }

    delete(id: string) {
        this.deleteService.deleteDish(id)
        .subscribe(response => {
            const list = this.dishesSubject.value.filter(item => item._id !== response._id);
            this.dishesSubject.next(list);
        });
    }
}
