import { Component, Input, OnInit } from '@angular/core';

import { Category } from '../models/category.model';
import { FilterCorrectFormatService } from '../../../shared/services/filter-correct-format.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ErrorMatcher } from '../../../shared/errorMatcher';
import { SnackbarService } from '../../../shared/services/snackbar.service';
import { StateService } from '../state.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  _categories: Category[];
  get categories(): Category[] {
    return this._categories;
  }
  @Input() set categories(value: Category[]) {
    this._categories = value;
  }
  get name() {
    return this.addForm.get('name');
  }
  disableSubmit = false;
  addForm: FormGroup;
  matcher = new ErrorMatcher;
  constructor(
    private stateService: StateService,
    private snackBar: SnackbarService,
    private filterCorrectFormat: FilterCorrectFormatService,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.addForm = this.fb.group({
      name: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')])
    });
  }

  validateForm(formValue: Category) {
    this.disableSubmit = true;
    const validFormat = this.filterCorrectFormat.filterCategory(formValue.name);
    if (this.categories.find(item => item.name === validFormat)) {
      this.disableSubmit = false;
      this.snackBar.open(`${formValue.name} is already registred!`, null, 'warning-snackbar');
      return;
    }
    const category = new Category(validFormat);
    this.stateService.post(category);
    this.addForm.reset();
    this.disableSubmit = false;
  }

}
