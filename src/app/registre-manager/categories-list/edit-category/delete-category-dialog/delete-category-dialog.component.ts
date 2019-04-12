import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { StateService } from '../../state.service';

@Component({
  selector: 'app-delete-category-dialog',
  template: `
  <h1 mat-dialog-title><a translate>INGREDIENTS.ARE-YOU-SURE</a></h1>
    <div mat-dialog-content>
      <mat-list>
          <mat-list-item>
            <h4 mat-line>{{ data.name }}</h4>
              <p mat-line><small translate>INGREDIENTS.CATEGORY</small></p>
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
  styleUrls: ['./delete-category-dialog.component.css']
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
        this.stateService.delete(this.data._id);
        this.dialogRef.close(true);
    }
}

