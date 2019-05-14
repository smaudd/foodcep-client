import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { HelpDialogComponent } from 'src/app/core/layout/help-dialog/help-dialog.component';

@Component({
  selector: 'app-products-manager',
  templateUrl: './products-manager.component.html',
  styleUrls: ['./products-manager.css']
})
export class ProductsManagerComponent {

  constructor(private dialog: MatDialog) { }

  openHelp() {
    this.dialog.open(HelpDialogComponent, { data: 'products.md', height: '90vh' })
  }
}

