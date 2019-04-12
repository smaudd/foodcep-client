import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { FilterCorrectFormatService } from '../../../shared/services/filter-correct-format.service';
import { Ingredient } from '../../../shared/models/ingredient.model';
import { ErrorMatcher } from '../../../shared/errorMatcher';
import { SnackbarService } from '../../../shared/services/snackbar.service';
import { StateService } from '../state.service';
import { StateService as CategoryStateService } from '../../categories-list/state.service';

@Component({
  selector: 'app-add-registre',
  templateUrl: './add-registre.component.html',
  styleUrls: ['./add-registre.component.css']
})
export class AddRegistreComponent implements OnInit, OnDestroy {

  disableButton = false;
  addForm: FormGroup;
  matcher = new ErrorMatcher();
  categorySubject$ = this.categoryStateService.categoriesSubject;
  _ingredients: Ingredient[];

  get name() {
    return this.addForm.get('name');
  }

  get pPK() {
    return this.addForm.get('pPK');
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
    private snackBar: SnackbarService,
    private filterCorrectFormat: FilterCorrectFormatService,
    private stateService: StateService,
    private fb: FormBuilder,
    private categoryStateService: CategoryStateService
    ) {}

  ngOnInit() {
    this.addForm = this.fb.group({
      name: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
      pPK: new FormControl('', [Validators.required]),
      loss: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required])
    });
  }

  ngOnDestroy() {
    // this.categorySubject$.unsubscribe();
  }

  submitIngredient(formValue: Ingredient) {
    this.disableButton = true;
    const validFormat = this.filterCorrectFormat.filterInput(formValue.name);
    if (this.ingredients.find(item => item.name === validFormat)) {
      this.disableButton = false;
      this.snackBar.open(`${validFormat} is already on the registre!`, null, 'warning-snackbar', 3000);
      return;
    }
    let finalPrice = (formValue.loss * formValue.pPK / 1000) + formValue.pPK;
    finalPrice = Math.round( finalPrice * 1e3 ) / 1e3;
    const ingredient = new Ingredient(validFormat, formValue.pPK, formValue.loss, finalPrice, formValue.category);
    // Data store
    this.stateService.post(ingredient);
    this.addForm.reset();
    this.disableButton = false;
  }

}
