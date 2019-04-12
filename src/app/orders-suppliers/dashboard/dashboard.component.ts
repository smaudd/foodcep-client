import { Component, OnInit } from '@angular/core';
import { StateService } from './services/state.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  orders$ = this.stateService.ordersSubject;

  constructor(private stateService: StateService) { }

  ngOnInit() {
    this.stateService.getAll();
  }

}
