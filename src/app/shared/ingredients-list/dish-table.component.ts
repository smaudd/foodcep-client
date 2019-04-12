import { Component, Output, EventEmitter, OnInit } from '@angular/core';

import { IngredientForDish } from '../models/ingredient-for-dish.model';
import { Ingredient } from '../models/ingredient.model';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StateService } from './state.service';
import { ErrorMatcher } from '../errorMatcher';

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
                   <div fxLayout="row" fxLayoutGap="10px">
                      <small><strong><a translate>DISHES.PPP </a>:  {{ pPP | currency:'EUR' }}</strong></small>
                      <small><strong><a translate>INGREDIENTS.PPK </a>: {{ ingredient.finalPrice | currency:'EUR' }}</strong></small>
                    </div>
                  </mat-expansion-panel>
            </mat-accordion>
            <br>
  `,
  styleUrls: ['./ingredients-list.component.css'],
})
export class DishTableComponent implements OnInit {

  ingredient: Ingredient;
  @Output() add = new EventEmitter(true);
  ingredientsSubject$ = this.stateService.ingredientsSubject;
  gramsForm: FormGroup;
  notFound: boolean;
  matcher = new ErrorMatcher;
  pPP = 0;

  get grams() {
    return this.gramsForm.get('grams');
  }

  constructor(
    private stateService: StateService,
    private fb: FormBuilder
    ) {}

    ngOnInit() {
      this.gramsForm = this.fb.group({
        grams: new FormControl('', [Validators.required, Validators.pattern('([1-9](\.[0-9]+)?)|(0\.[0-9]*[1-9])')])
      });
      this.calculate();
    }


    calculate() {
        this.gramsForm.get('grams').valueChanges.subscribe((input) => {
          this.pPP = (input * this.ingredient.finalPrice) / 1000;
          this.pPP = Math.round( this.pPP * 1e3 ) / 1e3;
        });
    }

    selectIngredient(ingredient: Ingredient) {
        this.ingredient = ingredient;
    }

    submit(ingredient: Ingredient, grams: number) {
        const ingredientForDish = new IngredientForDish(ingredient.name, grams, this.pPP);
        this.gramsForm.reset();
        this.add.emit(ingredientForDish);
    }
}


