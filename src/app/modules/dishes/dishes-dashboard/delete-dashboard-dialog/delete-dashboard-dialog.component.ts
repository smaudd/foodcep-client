import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { StateService } from '../../services/state.service';

@Component({
  selector: 'app-delete-dashboard-dialog',
  templateUrl: './delete-dashboard-dialog.component.html',
})

export class DeleteDashboardDialogComponent implements OnInit {

constructor(
  public dialogRef: MatDialogRef<DeleteDashboardDialogComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any, private stateService: StateService) {}

onNoClick(): void {
  this.dialogRef.close();
}
  ngOnInit() {
  }

  deleteData() {
    this.stateService.delete(this.data.dish_id);
    this.dialogRef.close();
  }
}
