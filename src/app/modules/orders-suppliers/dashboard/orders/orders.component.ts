import { Component, OnInit, OnChanges, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { SnackbarService } from '../../../shared/services/snackbar.service';
import { trigger, transition, useAnimation } from '@angular/animations';
import { ItemErrorMatcher } from '../../../shared/errorMatcher';
import { Subscription, fromEvent, Observable } from 'rxjs';
import { skip, tap, mergeMap } from 'rxjs/operators';
import { StateService } from '../state.service';
import { StateService as SupplierStateService } from '../../suppliers/state.service';
import { Item } from '../models/order.model';
import { CounterService } from './counter.service';
import { OrderOverviewDialogComponent } from './order-overview-dialog.component';
import { fadeInOut, fader } from '../../../../animations/navigation-animations';
import { Ingredient } from '../../../shared/models/ingredient.model';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition('void => *', [useAnimation(fadeInOut, { params: { time: '.3s' } })])
    ]),
    fader
  ]
})

export class OrdersComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  order$ = this.dashboardStateService.orderSubject;
  isLoading$ = this.dashboardStateService.loadingSubject;
  click$ = fromEvent(document, 'click');
  suppliers$ = this.supplierStateService.suppliersSubject;
  shoppingForm: FormGroup;
  matcher = new ItemErrorMatcher;
  supplier: string;
  items$: Observable<Item[]>
  get itemsForms() { return this.shoppingForm.get('items') as FormArray }

  constructor(
    private fb: FormBuilder,
    private snackbar: SnackbarService,
    private dashboardStateService: StateService,
    private counterService: CounterService,
    private supplierStateService: SupplierStateService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router
    ) {}

  ngOnInit() {
    this.setForm();
    this.route.queryParams
    .pipe(
      tap(value => this.dashboardStateService.getOne(value.id)),
      mergeMap(_ => this.order$),
      skip(1)
    ).subscribe(order => {
      if (order !== null) {
        order.items.forEach((item: Item) => {
          // Creates the forms array based on the requested order
          this.itemsForms.push(this.createItem(item, item.quantity, item.unit))
        })
      }
    })
  }

  setForm() {
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
        this.router.navigate(['/orders-suppliers'])
      }
    })
  }

  ngOnDestroy() {
    if (this.subscription !== undefined) { this.subscription.unsubscribe(); }
  }

}

