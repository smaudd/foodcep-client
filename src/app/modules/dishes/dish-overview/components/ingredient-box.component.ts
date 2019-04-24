import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { IngredientForDish } from '../../../shared/models/ingredient-for-dish.model';
import { OperationsService } from '../services/operations.service';

@Component({
  selector: 'app-ingredient-box',
  template: `
            <form [formGroup]="boxForm">
                <mat-form-field style="width: 100%">
                    <input matInput type="number" placeholder="{{ 'DISHES.GPP' | translate }}" autocomplete="off" formControlName="grams">
                    <span matSuffix>gr</span>
                    <mat-error *ngIf="grams.hasError('pattern')"><span translate>DISHES.JUST-DELETE</span></mat-error>
                    <mat-error *ngIf="grams.hasError('required')"><span translate>DISHES.GPP-REQUIRED</span></mat-error>
                </mat-form-field>
                <br>
                <small>
                    <strong><span translate>DISHES.PPP</span>:
                    {{ (grams.value * ingredient.pPP / ingredient.gPP).toFixed(2) | currency:'EUR' }}</strong>
                </small>
                <div align="end">
                    <button mat-icon-button type="submit"
                        (click)="edition(ingredient, grams.value)"
                        (keydown.enter)="edition(ingredient, grams.value)"
                        *ngIf="boxForm.valid && boxForm.dirty">
                    <mat-icon class="icon" color="warn">check</mat-icon>
                    </button>
                    <button mat-icon-button  type="button" (click)="deletion(ingredient)">
                        <mat-icon class="icon" color="warn">delete</mat-icon>
                    </button>
                </div>
                <br>
            </form>
`
})


export class IngredientBoxComponent implements OnInit {

    get grams() {
        return this.boxForm.get('grams');
    }

    @Input() ingredient: IngredientForDish = null;
    @Output() setGrams = new EventEmitter(true);
    @Output() removeIngredient = new EventEmitter(true);

    boxForm: FormGroup;
    isInfoSet = false;
    constructor(private fb: FormBuilder, private operationService: OperationsService) {}

    ngOnInit() {
        this.boxForm = this.fb.group({
            grams: new FormControl('', [Validators.required, Validators.pattern('([1-9](\.[0-9]+)?)|(0\.[0-9]*[1-9])')])
        });

        this.boxForm.get('grams').setValue(this.ingredient.gPP);

    }

    edition(ingredient: IngredientForDish, value: number) {
        ingredient.gPP = value;
        ingredient = this.operationService.calculateOnePPP(ingredient);
        this.setGrams.emit(ingredient);
    }

    deletion(ingredient: IngredientForDish) {
        this.removeIngredient.emit(ingredient);
    }

}
