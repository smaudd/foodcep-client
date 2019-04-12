import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { StateService } from '../../state.service';

@Component({
  selector: 'app-edit-dialog',
  template: `
  <h1 mat-dialog-title><a translate>INGREDIENTS.ARE-YOU-SURE-2</a></h1>
        <div mat-dialog-content>
                <div style="align-content: center">
                        <mat-list>
                        <mat-list-item>
                                <h4 mat-line>{{ data.name }}</h4>
                                <p mat-line><small translate>INGREDIENTS.NAME</small></p>
                        </mat-list-item>
                        <mat-list-item>
                                <h4 mat-line>{{ data.pPK | currency:'EUR' }}</h4>
                                <p mat-line><small translate>INGREDIENTS.PPK</small></p>
                        </mat-list-item>
                        <mat-list-item>
                                <h4 mat-line>{{ data.loss }}gr</h4>
                                <p mat-line><small translate>INGREDIENTS.INGREDIENT-LOSS</small></p>
                        </mat-list-item>
                        <mat-list-item>
                                <h4 mat-line>{{ data.category }}</h4>
                                <p mat-line><small translate>INGREDIENTS.CATEGORY</small></p>
                        </mat-list-item>
                        </mat-list>
                  </div>
          </div>
          <div mat-dialog-actions align="end">
                  <button mat-icon-button color="accent" (click)="putData()">
                          <mat-icon>save</mat-icon>
                  </button>
                  <button mat-icon-button color="warn" (click)="onNoClick()">
                          <mat-icon>cancel</mat-icon>
                  </button>
          </div>
  `,
  styleUrls: ['./edit-dialog.component.css']
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

