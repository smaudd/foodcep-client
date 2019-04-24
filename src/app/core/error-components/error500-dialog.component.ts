import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'dialog-overview-example-dialog',
  template: `
    <div fxLayout="column" align="center">
        <mat-icon color="warn">report_problem</mat-icon>
        <h3>Something went wrong :(</h3>
    </div>
    <i>Status {{ data.status }}</i>
    <div align="end">
        <button mat-raised-button color="warn" (click)="onNoClick()">Try Again</button>
    </div>
  `,
})
export class ErrorDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ErrorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
    location.reload();
  }

}
