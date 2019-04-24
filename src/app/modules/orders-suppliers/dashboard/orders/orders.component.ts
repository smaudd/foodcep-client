import { Component, OnInit, OnChanges, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { SnackbarService } from '../../../shared/services/snackbar.service';
import { trigger, transition, useAnimation } from '@angular/animations';
import { ItemErrorMatcher } from '../../../shared/errorMatcher';
import { Subscription, fromEvent } from 'rxjs';
import { skip } from 'rxjs/operators';
import { StateService } from '../state.service';
import { StateService as SupplierStateService } from '../../suppliers/state.service';
import { Item } from '../models/order.model';
import { CounterService } from './counter.service';
import { OrderOverviewDialogComponent } from './order-overview-dialog.component';
import { slide, fadeInOut } from '../../../../animations/navigation-animations';
import { Ingredient } from '../../../shared/models/ingredient.model';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
  animations: [
    trigger('toolbarSlide', [
      transition('* <=> void', [useAnimation(slide, { params: { time: '.25s' } })])
    ]),
    trigger('fadeInOut', [
      transition('* <=> void', [useAnimation(fadeInOut, { params: { time: '.3s' } })])
    ])
  ]
})

export class OrdersComponent implements OnInit, OnChanges, OnDestroy {

  @Input() order_id: number;
  @Output() done = new EventEmitter();
  subscription: Subscription;
  order$ = this.dashboardStateService.orderSubject;
  isLoading$ = this.dashboardStateService.loadingSubject;
  click$ = fromEvent(document, 'click');
  suppliers$ = this.supplierStateService.suppliersSubject;
  shoppingForm: FormGroup;
  matcher = new ItemErrorMatcher;
  supplier: string;
  get itemsForms() { return this.shoppingForm.get('items') as FormArray }

  constructor(
    private fb: FormBuilder,
    private snackbar: SnackbarService,
    private dashboardStateService: StateService,
    private counterService: CounterService,
    private supplierStateService: SupplierStateService,
    private dialog: MatDialog
    ) {}

  ngOnChanges() {
    if (this.order_id) {
      this.dashboardStateService.getOne(this.order_id);
      this.subscription = this.order$
      .pipe(skip(1))
      .subscribe(order => {
        order.items.forEach((item: Item) => {
          // Creates the forms array based on the requested order
          this.itemsForms.push(this.createItem(item, item.quantity, item.unit))
        })
      })
    }
  }

  ngOnInit() {
    this.supplierStateService.get();
    this.shoppingForm = this.fb.group({
      supplier: new FormControl(null, [Validators.required]),
      items: this.fb.array([])
    });
  }

  createItem(ingredient: any, quantity: number, unit: string): FormGroup {
      return this.fb.group({
        name: ingredient.name,
        quantity: new FormControl(quantity, [Validators.required, Validators.pattern('([1-9](\.[0-9]+)?)|(0\.[0-9]*[1-9])')]),
        unit: new FormControl(unit, [Validators.required]),
        product_id: ingredient.product_id
      });
  }

  addToList(ingredient: Ingredient) {
    // Repeated items not allowed
    for (let i = 0; i < this.itemsForms.value.length; i++) {
      if (this.itemsForms.value[i].name === ingredient.name) {
        this.snackbar.open('Already on list!', null, 'warning-snackbar', 1000);
        return;
      }
    }
    this.itemsForms.insert(0, this.createItem(ingredient, null, null));
  }

  // For buttons plus and minus
  clickHandler(operator: string, index: number, previousQuantity: number) {
    // Holding the click button
    this.subscription = this.counterService.clickHoldingHandler(operator, previousQuantity)
    .subscribe(value => {
      this.itemsForms.at(index).get('quantity').setValue(value);
    })
    // Regular clicks
    const value = this.counterService.clickHandler(operator, previousQuantity);
    this.itemsForms.at(index).get('quantity').setValue(value);
  }

  deleteItem(i: number) {
    this.itemsForms.removeAt(i);
  }

  openOverviewDialog(formValue: any, isToSubmit: boolean): void {
    const dialogRef = this.dialog.open(OrderOverviewDialogComponent, {
      width: '600px',
      maxHeight: '80vh',
      autoFocus: false,
      data: { order: formValue, isToSubmit }
    });

    dialogRef.afterClosed().subscribe(value => {
      if (value === true) {
        this.done.emit(value);
      }
    })
  }

  ngOnDestroy() {
    if (this.subscription !== undefined) { this.subscription.unsubscribe(); }
  }

}

