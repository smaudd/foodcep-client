import { Component, Input, OnChanges, Output, EventEmitter, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { Category } from '../models/category.model';
import { FilterCorrectFormatService } from '../../../shared/services/filter-correct-format.service';
import { EditCategoryDialogComponent } from './edit-category-dialog/edit-category-dialog.component';
import { DeleteCategoryDialogComponent } from './delete-category-dialog/delete-category-dialog.component';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ErrorMatcher } from '../../../shared/errorMatcher';
import { SnackbarService } from '../../../shared/services/snackbar.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnChanges, OnInit {

  @Input() categories: Category[];
  @Input() category: Category;
  @Output() done = new EventEmitter(true);
  editForm: FormGroup;
  matcher = new ErrorMatcher;

  get name() {
    return this.editForm.get('name');
  }

  constructor(private filterFormatService: FilterCorrectFormatService,
    private snackBar: SnackbarService, public dialog: MatDialog, private fb: FormBuilder) { }

  ngOnInit() {
    this.editForm = this.fb.group({
      name: new FormControl('', [Validators.required, Validators.pattern('[A-Za-zÑñáéíóúüÁÉÍÓÚ ]*')])
    });
    this.editForm.get('name').setValue(this.category.name);
  }

  ngOnChanges() {}

  editRegistre(formValue: Category): void {
    const validFormat = this.filterFormatService.filterInput(formValue.name);
    if (this.categories.find(item => item.name === validFormat)) {
      this.snackBar.open(`${validFormat} is already on the list`, 'Done', 'warning-snackbar');
      return;
    }
    const edit = new Category(validFormat, this.category.category_id);
    console.log(edit);
    this.openEditDialog(edit);
  }

  openEditDialog(edit: Category): void {
    const dialogEditRef = this.dialog.open(EditCategoryDialogComponent, {
      width: '500px',
      data: edit
    });
  }

  openDeleteDialog(current: Category): void {
    const dialogDeleteRef = this.dialog.open(DeleteCategoryDialogComponent, {
      width: '500px',
      data: current
    });
  }

}
