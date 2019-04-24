import { Component, OnInit, OnDestroy } from '@angular/core';
import { StateService } from './state.service';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css']
})
export class CategoriesListComponent implements OnInit, OnDestroy {
  categoriesSubject$ = this.stateService.categoriesSubject;
  errorsSubject$ = this.stateService.errorsSubject;
  isLoading = true;
  emptyCollection: boolean;

  constructor(private stateService: StateService) { }

  ngOnInit() {
    this.stateService.get();
    this.dataStore();
    this.dataStoreErrors();
  }

  dataStore() {
    this.categoriesSubject$
    .subscribe(value => {
      if (value.length === 0) {
        this.emptyCollection = true;
        this.isLoading = false;
        return;
      }
      this.emptyCollection = false;
      this.isLoading = false;
    });
  }

  dataStoreErrors() {
    this.errorsSubject$
    .subscribe(_ => {
      this.emptyCollection = true;
    });
  }

  ngOnDestroy() {
    // this.categoriesSubject$.unsubscribe();
  }

}
