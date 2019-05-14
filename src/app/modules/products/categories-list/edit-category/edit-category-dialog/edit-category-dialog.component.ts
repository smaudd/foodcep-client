import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { StateService } from '../../state.service';

@Component({
  selector: 'app-edit-category-dialog',
  template: `
  <h1 mat-dialog-title><span translate>INGREDIENTS.ARE-YOU-SURE-2</span></h1>
          <div mat-dialog-content>
            <div align="center" fxLayout="column" fxLayoutGap="5px">
                <h4 class="dialog-content-will-delete">{{ data.name }}</h4>
                <p mat-line><small translate>INGREDIENTS.CATEGORY</small></p>
            </div>
          </div>
          <div mat-dialog-actions align="end">
              <button mat-icon-button cdkFocusInitial (click)="putData()">
                  <mat-icon color="accent">save</mat-icon>
              </button>
              <button mat-icon-button (click)="onNoClick()" color="warn">
                  <mat-icon>cancel</mat-icon>
              </button>
          </div>
  `,
  styleUrls: ['./edit-category-dialog.component.css']
})
export class EditCategoryDialogComponent implements OnInit {

  constructor(public dialogEditRef: MatDialogRef<EditCategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private stateService: StateService
    ) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogEditRef.close();
  }

  putData() {
    console.log(this.data);
    this.stateService.update(this.data);
    this.dialogEditRef.close(true);
}

}

