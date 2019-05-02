import { Component, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import { MatDialog } from '@angular/material';
import { FilterCorrectFormatService } from '../../../shared/services/filter-correct-format.service';
import { Ingredient } from '../../../shared/models/ingredient.model';
import { Category } from '../../categories-list/models/category.model';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { SnackbarService } from '../../../shared/services/snackbar.service';
import { StateService } from '../state.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnChanges {

  get name() {
    return this.editForm.get('name');
  }

  get price() {
    return this.editForm.get('price');
  }

  get loss() {
    return this.editForm.get('loss');
  }

  get category() {
    return this.editForm.get('category');
  }

  @Input() ingredient: Ingredient;
  @Input() categories: Category[];
  @Output() init = new EventEmitter();
  editForm: FormGroup;
  ingredients$ = this.stateService.productsSubject;

  ngOnChanges(changes: SimpleChanges) {
      this.editForm.get('name').setValue(this.ingredient.name);
      this.editForm.get('price').setValue(this.ingredient.price);
      this.editForm.get('loss').setValue(this.ingredient.loss);
      this.editForm.get('category').setValue(this.ingredient.category);
  }

  constructor(private fb: FormBuilder,
              private filterFormatService: FilterCorrectFormatService,
              private snackBar: SnackbarService,
              public dialog: MatDialog,
              private stateService: StateService) {

      this.editForm = this.fb.group({
        name: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.maxLength(19)]),
        price: new FormControl('', [Validators.required, Validators.max(1000)]),
        loss: new FormControl('', [Validators.required, Validators.max(1000)]),
        category: new FormControl('', [Validators.required])
      });

     }

  editIngredient(formValue: Ingredient) {
    formValue.name = this.filterFormatService.filterInput(formValue.name);
    const ingredients = this.ingredients$.value;
    if (ingredients.find(item => item.name === formValue.name) &&
        formValue.price === this.ingredient.price &&
        formValue.loss === this.ingredient.loss &&
        formValue.category === this.ingredient.category) {
      this.editForm.get('name').setErrors({ 'repeated': true });
      return;
    }
    const costPerLoss = formValue.loss * formValue.price / 1000;
    const cost = costPerLoss + formValue.price;
    const toEdit = new Ingredient(formValue.name, formValue.price, formValue.loss, cost, formValue.category, this.ingredient.product_id);
    this.openEditDialog(toEdit);
    }

    openEditDialog(edition): void {
      const dialogEditRef = this.dialog.open(EditDialogComponent, {
        width: '550px',
        data: edition
      });
      dialogEditRef.afterClosed().subscribe(_ => this.init.emit(true))
    }

    openDeleteDialog(current: Ingredient): void {
      const dialogDeleteRef = this.dialog.open(DeleteDialogComponent, {
        width: '500px',
        data: current
      });
      dialogDeleteRef.afterClosed().subscribe(_ => this.init.emit(true))
    }

}
