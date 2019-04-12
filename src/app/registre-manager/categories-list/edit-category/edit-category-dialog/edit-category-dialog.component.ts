import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { StateService } from '../../state.service';

@Component({
  selector: 'app-edit-category-dialog',
  template: `
  <h1 mat-dialog-title><a translate>INGREDIENTS.ARE-YOU-SURE-2</a></h1>
          <div mat-dialog-content>
                <mat-list>
                    <mat-list-item>
                        <h4 mat-line>{{ data.name }}</h4>
                        <p mat-line><small translate>INGREDIENTS.CATEGORY</small></p>
                    </mat-list-item>
                </mat-list>
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
    this.stateService.update(this.data);
    this.dialogEditRef.close(true);
}

}

