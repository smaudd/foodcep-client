import { Component, Output, EventEmitter } from '@angular/core';

import { Ingredient } from '../../../models/ingredient.model';
import { StateService } from '../state.service';

@Component({
  selector: 'app-shopping-table',
  template: `

                <table mat-table [dataSource]="ingredientsSubject$ | async">
                    <ng-container matColumnDef="name">
                      <th mat-header-cell *matHeaderCellDef></th>
                      <td mat-cell *matCellDef="let ingredient"> {{ ingredient.name }} </td>
                    </ng-container>
                      <ng-container matColumnDef="add">
                        <th mat-header-cell *matHeaderCellDef></th>
                        <td mat-cell *matCellDef="let ingredient">
                          <button mat-icon-button (click)="submit(ingredient)">
                            <mat-icon color="primary">add_circle</mat-icon>
                          </button>
                        </td>
                      </ng-container>

                    <tr mat-header-row *matHeaderRowDef="displayedColumns;" [hidden]="true"></tr>
                    <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
                  </table>
  `,
  styleUrls: ['../products-finder.component.css'],
})
export class ShoppingTableComponent {

  @Output() add = new EventEmitter(true);
  ingredient: Ingredient;
  displayedColumns: string[] = [ 'name', 'add' ];
  ingredientsSubject$ = this.stateService.ingredientsSubject;

  constructor(
    private stateService: StateService,
    ) {}

    submit(ingredient) {
        this.add.emit(ingredient);
    }

}
