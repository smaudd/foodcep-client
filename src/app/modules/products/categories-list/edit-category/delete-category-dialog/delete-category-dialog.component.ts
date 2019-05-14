import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { StateService } from '../../state.service';

@Component({
  selector: 'app-delete-category-dialog',
  template: `
  <h1 mat-dialog-title><span translate>INGREDIENTS.ARE-YOU-SURE</span></h1>
    <div mat-dialog-content>
    <strong translate>INGREDIENTS.BE-CAREFULL</strong>
      <div align="center" fxLayout="column" fxLayoutGap="5px">
        <h4 class="dialog-content-will-delete">{{ data.name }}</h4>
        <p mat-line><small translate>INGREDIENTS.CATEGORY</small></p>
      </div>
    </div>
    <div mat-dialog-actions align="end">
        <button mat-icon-button (click)="deleteData()">
            <mat-icon color="accent">done</mat-icon>
        </button>
        <button mat-icon-button (click)="onNoClick()">
            <mat-icon color="warn">cancel</mat-icon>
        </button>
    </div>
  `
})
export class DeleteCategoryDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DeleteCategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private stateService: StateService
    ) {}

  onNoClick(): void {
    this.dialogRef.close(undefined);
  }

    ngOnInit() {
    }

    deleteData() {
        this.stateService.delete(this.data.category_id);
        this.dialogRef.close(true);
    }
}

