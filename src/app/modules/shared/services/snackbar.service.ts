import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(public snackBar: MatSnackBar) { }

  open(message: string, action: string, color: string, timing?: number) {
    this.snackBar.open(message, action, { duration: timing, panelClass: [color] });
  }

}
