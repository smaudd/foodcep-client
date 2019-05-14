import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { HelpDialogComponent } from 'src/app/core/layout/help-dialog/help-dialog.component';


@Component({
  selector: 'app-orders-suppliers',
  templateUrl: './orders-suppliers.component.html',
  styleUrls: ['./orders-suppliers.component.css'],
})
export class OrdersSuppliersComponent implements OnInit {

  isOrder = false;

  constructor(public dialog: MatDialog) { }

  ngOnInit() {}

  toggleIsOrder() {
    this.isOrder ? this.isOrder = false : this.isOrder = true;
  }

  newOrder() {
    this.isOrder = true;
  }

  openHelp() {
    this.dialog.open(HelpDialogComponent, { data: 'ons.md', height: '90vh' })
  }

}
