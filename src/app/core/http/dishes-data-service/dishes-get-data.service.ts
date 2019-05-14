import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

import { Dish } from '../../../modules/dishes/models/dish.model';
import { OperationsService } from '../../../modules/dishes/dish-overview/services/operations.service';
import { CookieService } from 'ngx-cookie-service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  }),
  withCredentils: true
};

@Injectable({
  providedIn: 'root'
})
export class DishesService {

  private getDishesRoute = '~/api/dishes/read/';
  private getDishRoute = '~/api/dishes/read/complete/';
  private getPDFRoute = '~/api/dishes/read/pdf/';
  private getDishesWithoutRecipeRoute = '~/api/dishes/read/without-recipe';


  constructor(
    private http: HttpClient,
    private operationsService: OperationsService,
    private cookieService: CookieService
    ) { }

  getDishes(): Observable<Dish[] | any> {
    return this.http.get<Dish[]>(this.getDishesRoute, httpOptions)
  }

  getDishesWithoutRecipe(): Observable<Dish[]> {
    return this.http.get<Dish[]>(this.getDishesWithoutRecipeRoute, httpOptions);
  }

  getOneDish(dish_id: number): Observable<Dish> {
    return this.http.get<Dish>(this.getDishRoute + dish_id, httpOptions)
    .pipe(
      map(dish => {
        dish.ingredients = this.operationsService.calculateEveryPPP(dish.ingredients);
        return  dish;
      })
    )
  }

  getPDF(id: string): Observable<Dish> {
    return this.http.get<Dish | any>(this.getPDFRoute + id, httpOptions)
    .pipe(
      map(val => {
        const CURRENCY = this.cookieService.get('CURRENCY')
        val.ingredients.forEach(ingredient => {
          ingredient.gPP = ingredient.gPP + 'gr';
          ingredient.pPP = ingredient.pPP.toFixed(2) + CURRENCY;
        });
        return val;
      })
    );
  }

}
