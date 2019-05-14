import { Component, Output, EventEmitter, OnInit } from '@angular/core';

import { IngredientForDish } from '../../../models/ingredient-for-dish.model';
import { Ingredient } from '../../../models/ingredient.model';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StateService } from '../state.service';
import { ErrorMatcher } from '../../../errorMatcher';
import { OperationsService } from '../../../../dishes/dish-overview/services/operations.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-dish-table',
  template: `
  <mat-accordion>

              <mat-expansion-panel #state="matExpansionPanel"
                *ngFor="let ingredient of ingredientsSubject$ | async"
                (click)="selectIngredient(ingredient)" (keyup)="selectIngredient(ingredient)">

                  <mat-expansion-panel-header>
                    <mat-panel-title>
                            {{ ingredient.name }}
                    </mat-panel-title>
                  </mat-expansion-panel-header>
                  <form fxLayout="row" [formGroup]="gramsForm">
                      <mat-form-field stye={width:90%}>
                        <input matInput type="number" autocomplete="off" placeholder="{{ 'DISHES.GPP' | translate }}"
                          formControlName="grams" [errorStateMatcher]="matcher">
                          <span matSuffix>gr&nbsp;</span>
                      </mat-form-field>
                      <div align="end">

                              <button mat-icon-button type="submit"
                              *ngIf="grams.valid"
                              (click)="submit(ingredient, grams.value); state.expanded = !state.expanded;">
                                  <mat-icon color="accent">add_circle</mat-icon>
                              </button>

                      </div>
                  </form>
                   <div fxLayout="column" fxLayoutGap="10px" class="little-text">
                      <span><span translate>DISHES.PPP</span>:  {{ grams.value * ingredient.cost / 1000 | currency:currency }}</span>
                      <span><span translate>INGREDIENTS.PPK </span>: {{ ingredient.cost | currency:currency }}</span>
                    </div>
                  </mat-expansion-panel>
            </mat-accordion>
            <br>
  `,
  styleUrls: ['../products-finder.component.css'],
})
export class DishTableComponent implements OnInit {

  ingredient: Ingredient;
  @Output() add = new EventEmitter(true);
  ingredientsSubject$ = this.stateService.ingredientsSubject;
  gramsForm: FormGroup;
  notFound: boolean;
  matcher = new ErrorMatcher;
  currency = this.cookieService.get('CURRENCY');


  get grams() {
    return this.gramsForm.get('grams');
  }

  constructor(
    private stateService: StateService,
    private fb: FormBuilder,
    private operationsService: OperationsService,
    private cookieService: CookieService
    ) {}

    ngOnInit() {
      this.gramsForm = this.fb.group({
        grams: new FormControl('', [Validators.required, Validators.pattern('([1-9](\.[0-9]+)?)|(0\.[0-9]*[1-9])'), Validators.max(9000)])
      });
    }

    selectIngredient(ingredient: Ingredient) {
        this.ingredient = ingredient;
    }

    submit(input_ingredient: Ingredient, grams: number) {
      let output_ingredient: IngredientForDish = new IngredientForDish(input_ingredient.product_id, input_ingredient.name, grams, input_ingredient.cost);
      output_ingredient = this.operationsService.calculateOnePPP(output_ingredient)
      this.gramsForm.reset();
      this.add.emit(output_ingredient);
    }
}


