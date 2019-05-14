import { Component, Output, EventEmitter } from '@angular/core';

import { Ingredient } from '../../../models/ingredient.model';
import { StateService } from '../state.service';

@Component({
  selector: 'app-shopping-table',
  template: `
        <mat-list class="mat-elevation-z1 shopping-product">
          <mat-list-item *ngFor="let ingredient of ingredientsSubject$ | async">
            <a mat-line>{{ ingredient.name }}</a>
            <button mat-icon-button (click)="submit(ingredient)">
              <mat-icon color="primary">add_circle</mat-icon>
            </button>
          </mat-list-item>
        </mat-list>
  `,
  styleUrls: ['../products-finder.component.css'],
})
export class ShoppingTableComponent {

  @Output() add = new EventEmitter(true);
  ingredient: Ingredient;
  ingredientsSubject$ = this.stateService.ingredientsSubject;

  constructor(
    private stateService: StateService,
    ) {}

    submit(ingredient) {
        this.add.emit(ingredient);
    }

}
