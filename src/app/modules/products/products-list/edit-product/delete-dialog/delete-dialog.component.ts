import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { StateService } from '../../state.service';


@Component({
  selector: 'app-delete-dialog',
  template: `
  <div fxLayout="column">
      <h1 mat-dialog-title><span translate>INGREDIENTS.ARE-YOU-SURE</span></h1>
      <div mat-dialog-content>
        <strong translate>INGREDIENTS.BE-CAREFULL-ING</strong>
        <div align="center" fxLayout="column">
          <h4 class="dialog-content-will-delete">{{ data.name }}</h4>
        </div>
      </div>
        <div mat-dialog-actions align="end">
            <button mat-icon-button (click)="deleteData()">
                <mat-icon color="accent">check</mat-icon>
              </button>
            <button mat-icon-button (click)="onNoClick()">
                  <mat-icon color="warn">cancel</mat-icon>
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
    this.dialogRef.close();
  }

  deleteData() {
      this.stateService.delete(this.data.product_id);
      this.dialogRef.close();
  }

}
