import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { StateService } from '../state.service';




@Component({
  selector: 'app-delete-recipe-dialog',
  template: `
  <h1 mat-dialog-title>
  <span translate>ORDERS.ARE-YOU-SURE?</span></h1>
    <div mat-dialog-content>
      <mat-list>
          <mat-list-item align="center">
            <h4 mat-line style="font-size: 20px;">{{ data.name }}</h4>
          </mat-list-item>
        </mat-list>
    </div>
    <div mat-dialog-actions align="end">
        <button mat-icon-button (click)="deleteData()">
            <mat-icon color="accent">done</mat-icon>
        </button>
        <button mat-icon-button (click)="onNoClick()">
            <mat-icon color="warn">cancel</mat-icon>
        </button>
    </div>
  `,
})
export class DeleteSupplierDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteSupplierDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private stateService: StateService
    ) {}

  onNoClick(): void {
    this.dialogRef.close(undefined);
  }

  deleteData() {
    this.stateService.delete(this.data);
    this.dialogRef.close(true);
  }
}
