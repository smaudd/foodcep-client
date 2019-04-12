import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { StateService } from '../../state.service';


@Component({
  selector: 'app-delete-dialog',
  template: `
  <div fxLayout="column">
      <h1 mat-dialog-title><a translate>INGREDIENTS.ARE-YOU-SURE</a></h1>
      <div mat-dialog-content>
          <mat-list>
              <mat-list-item>
                <h4 mat-line>{{ data.name }}</h4>
                  <p mat-line><small translate>INGREDIENTS.INGREDIENT</small></p>
              </mat-list-item>
          </mat-list>
      </div>
        <div mat-dialog-actions align="end">
            <button mat-icon-button color="accent" (click)="deleteData()">
                <mat-icon>check</mat-icon>
              </button>
            <button mat-icon-button color="warn" (click)="onNoClick()">
                  <mat-icon>cancel</mat-icon>
            </button>
        </div>
  </div>
  `,
  styleUrls: ['./delete-dialog.component.css']
})

export class DeleteDialogComponent {

constructor(
  public dialogRef: MatDialogRef<DeleteDialogComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any,
  private stateService: StateService
  ) {}

  onNoClick(): void {
    this.dialogRef.close(undefined);
  }

  deleteData() {
      this.stateService.delete(this.data._id);
      this.dialogRef.close(true);
  }

}
