import { Component, OnInit } from '@angular/core';
import { StateService } from './state.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css']
})
export class CategoriesListComponent implements OnInit {
  categoriesSubject$ = this.stateService.categoriesSubject;
  errorsSubject$ = this.stateService.errorsSubject;
  isLoading = true;
  emptyCollection: boolean;
  subscription: Subscription;
  loadingSubject$ = this.stateService.loadingSubject;

  constructor(private stateService: StateService) { }

  ngOnInit() {
    this.stateService.get();
  }



}
