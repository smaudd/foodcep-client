import { Component, OnInit, AfterContentInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { SnackbarService } from '../../../shared/services/snackbar.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ItemErrorMatcher } from '../../../shared/errorMatcher';
import { Item, Order } from '../models/order.model';
import { fromEvent, interval } from 'rxjs';
import { takeUntil, takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0
      })),
      transition('void <=> *', animate(100)),
    ])
  ]
})


export class OrdersComponent implements OnInit, AfterContentInit {

  displayedColumns: string[] = [ 'name', 'quantity', 'unit' ];
  dataSource: MatTableDataSource<string>;
  list: Item[] = [];
  filteredList: Item[] = [];
  detail: string | null;
  mouseup$ = fromEvent(document, 'mouseup');
  click$ = fromEvent(document, 'click');
  shoppingForm: FormGroup;
  matcher = new ItemErrorMatcher;

  get itemsForms() {
    return this.shoppingForm.get('items') as FormArray;
  }

  constructor(private fb: FormBuilder, private snackbar: SnackbarService) {
    this.shoppingForm = this.fb.group({
      provider: '',
      items: this.fb.array([])
    });
  }

  createItem(name: string): FormGroup {
    return this.fb.group({
      name: name,
      quantity: new FormControl(null, [Validators.required, Validators.pattern('([1-9](\.[0-9]+)?)|(0\.[0-9]*[1-9])')]),
      unit: new FormControl(null, [Validators.required])
    });
  }

  ngOnInit() {
  }

  ngAfterContentInit() {
  }


  addToList(ingredient: string) {
    // Repeated items not allowed
    for (let i = 0; i < this.itemsForms.value.length; i++) {
      if (this.itemsForms.value[i].name === ingredient) {
        this.snackbar.open('Repeated item!', null, 'warning-snackbar', 1000);
        return;
      }
    }
    this.itemsForms.push(this.createItem(ingredient));
  }

  // For buttons plus and minus
  clickHandler(operator: string, index: number) {

    const source = interval(300);
    // If the user holds click down
    source.pipe(
      takeUntil(this.mouseup$),
      takeWhile(() => this.itemsForms.value[index].quantity > 0)
    ).subscribe(value => {
      this.sumSub(operator, index);
    });

    // Regular clicks
    this.sumSub(operator, index);
  }
  // Handles regular clicks to add or remove quantity
  sumSub(op: string, i: number) {
    if (op === 'sum') {
      const value = this.itemsForms.value[i].quantity += 1;
      this.itemsForms.at(i).get('quantity').setValue(value);
    } else {
      const value = this.itemsForms.value[i].quantity -= 1;
      this.itemsForms.at(i).get('quantity').setValue(value);
    }
  }

  deleteItem(i: number) {
    this.itemsForms.removeAt(i);
  }

}

