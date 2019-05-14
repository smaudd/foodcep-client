import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { FilterCorrectFormatService } from '../../../shared/services/filter-correct-format.service';
import { Ingredient } from '../../../shared/models/ingredient.model';
import { ErrorMatcher } from '../../../shared/errorMatcher';
import { SnackbarService } from '../../../shared/services/snackbar.service';
import { StateService } from '../state.service';
import { StateService as CategoryStateService } from '../../categories-list/state.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  disableButton = false;
  addForm: FormGroup;
  matcher = new ErrorMatcher();
  categorySubject$ = this.categoryStateService.categoriesSubject;
  _ingredients: Ingredient[];
  currency = this.cookieService.get('CURRENCY');

  get name() {
    return this.addForm.get('name');
  }

  get price() {
    return this.addForm.get('price');
  }

  get loss() {
    return this.addForm.get('loss');
  }

  get category() {
    return this.addForm.get('category');
  }

  get ingredients() {
    return this._ingredients;
  }

  @Input() set ingredients(value: Ingredient[]) {
    this._ingredients = value;
  }

  constructor(
    private cookieService: CookieService,
    private filterCorrectFormat: FilterCorrectFormatService,
    private stateService: StateService,
    private fb: FormBuilder,
    private categoryStateService: CategoryStateService
    ) {}

  ngOnInit() {
    this.addForm = this.fb.group({
      name: new FormControl('', [Validators.required, Validators.pattern('[A-Za-zÑñáéíóúüÁÉÍÓÚ ]*'), Validators.maxLength(19)]),
      price: new FormControl('', [Validators.required, Validators.max(1000)]),
      loss: new FormControl('', [Validators.required, Validators.max(1000)]),
      category: new FormControl('', [Validators.required])
    });
  }

  submitIngredient(formValue: Ingredient) {
    this.disableButton = true;
    const validFormat = this.filterCorrectFormat.filterInput(formValue.name);
    if (this.ingredients.find(item => item.name === validFormat)) {
      this.disableButton = false;
      this.addForm.get('name').setErrors({'repeated-product': true });
      return;
    }
    let cost = (formValue.loss * formValue.price / 1000) + formValue.price;
    cost = Math.round( cost * 1e3 ) / 1e3;
    const ingredient = new Ingredient(validFormat, formValue.price, formValue.loss, cost, formValue.category);
    // Data store
    this.stateService.post(ingredient);
    this.addForm.reset();
    this.disableButton = false;
  }

}
