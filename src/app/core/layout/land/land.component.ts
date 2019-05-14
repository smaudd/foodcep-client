import { Component, OnInit } from '@angular/core';
import { SessionDataService } from 'src/app/modules/shared/services/session-data.service';
import { OrdersService } from '../../http/orders-data-service/orders.service';
import { StatsDataService } from '../../http/chef-data-service/stats-data.service';
import { fader } from 'src/app/animations/navigation-animations';

@Component({
  selector: 'app-land',
  templateUrl: './land.component.html',
  styleUrls: ['./land.component.scss'],
  animations: [fader]
})
export class LandComponent implements OnInit {

  user = this.sessionDataService.getUsername();
  restaurant = this.sessionDataService.getRestaurantName();
  lastOrder$ = this.ordersDataService.getLastOrder();
  stats$ = this.statsDataService.getStats();

  constructor(
    private sessionDataService: SessionDataService,
    private ordersDataService: OrdersService,
    private statsDataService: StatsDataService
  ) { }

  ngOnInit() {
  }

}
