import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { StateService } from '../state.service';
import { Supplier } from '../models/supplier.model';
import { Router } from '@angular/router';
import { trigger, transition, useAnimation } from '@angular/animations';
import { fadeInOut } from 'src/app/animations/navigation-animations';

@Component({
  selector: 'app-new-supplier',
  template: `
    <mat-card style="padding: 20px; margin-top: 10px; margin-bottom: 10px" class="mat-elevation-z2" [@fadeInOut]>
      <div align="end">
          <button mat-button (click)="done.emit(true)" color="primary">
          <mat-icon>clear</mat-icon>
        </button>
      </div>
      <app-supplier-form (postSupplier)="post($event)"></app-supplier-form>
    </mat-card>
  `,
  animations: [
    trigger('fadeInOut', [
      transition('* <=> void', [useAnimation(fadeInOut, { params: { time: '.5s' } })])
    ])
  ]
})
export class NewSupplierComponent implements OnInit {

  @Output() done = new EventEmitter();
  constructor(private stateService: StateService, private router: Router) { }

  ngOnInit() {
  }

  post(supplier: Supplier) {
    this.stateService.post(supplier);
    this.done.emit(true);
  }

}
