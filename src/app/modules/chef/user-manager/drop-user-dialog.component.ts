import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { StateService } from './state.service';

@Component({
  selector: 'app-drop-user-dialog',
  template: `
  <div>
    <h3><span translate>TEAM.ARE-YOU-SURE</span></h3>
    <p translate>TEAM.THIS-ACTION</p>
    <div align="end">
      <button mat-icon-button (click)="deleteUser()">
        <mat-icon color="warn">check</mat-icon>
      </button>
      <button mat-icon-button (click)="onNoClick()">
        <mat-icon color="primary">clear</mat-icon>
      </button>
    </div>
  </div>
  `
})

export class DropUserDialogComponent implements OnInit {

constructor(
  public dialogRef: MatDialogRef<DropUserDialogComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any,
  private stateService: StateService
  ) {}

  ngOnInit() {
    console.log(this.data);
  }

  onNoClick(): void {
    console.log(this.data)
    this.dialogRef.close();
  }

  deleteUser() {
    this.stateService.deleteUser(this.data)
    this.dialogRef.close();
  }



}
