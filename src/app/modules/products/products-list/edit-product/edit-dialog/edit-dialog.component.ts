import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { StateService } from '../../state.service';

@Component({
  selector: 'app-edit-dialog',
  template: `
  <h1 mat-dialog-title><span translate>INGREDIENTS.ARE-YOU-SURE-2</span></h1>
        <div mat-dialog-content align="center" style="overflow: hidden">
              <div fxLayout="row" fxLayoutGap="20px">
                  <div>
                    <h4>{{ data.name }}</h4>
                    <p><small translate>INGREDIENTS.NAME</small></p>
                  </div>
                  <div>
                    <h4>{{ data.price | currency:'EUR' }}</h4>
                    <p><small translate>INGREDIENTS.PPK</small></p>
                  </div>
                  <div>
                    <h4>{{ data.loss }}gr</h4>
                    <p><small translate>INGREDIENTS.INGREDIENT-LOSS</small></p>
                  </div>
                  <div>
                    <h4>{{ data.category }}</h4>
                    <p><small translate>INGREDIENTS.CATEGORY</small></p>
                  </div>
                </div>
              <div>
          <div mat-dialog-actions align="end">
                  <button mat-icon-button (click)="putData()">
                          <mat-icon color="accent">save</mat-icon>
                  </button>
                  <button mat-icon-button (click)="onNoClick()">
                          <mat-icon color="warn">cancel</mat-icon>
                  </button>
          </div>
          <br>
  `
})

export class EditDialogComponent {

constructor(
  public dialogRef: MatDialogRef<EditDialogComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any,
  private stateService: StateService
  ) {}

  onNoClick(): void {
    this.dialogRef.close(undefined);
  }

  putData() {
    this.stateService.update(this.data);
    this.dialogRef.close(true);
  }

}

