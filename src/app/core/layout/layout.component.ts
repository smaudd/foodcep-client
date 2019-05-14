import { Component, OnInit } from '@angular/core';
import { anim } from 'src/app/animations/navigation-animations';
import { RouterOutlet } from '@angular/router';
import { SessionDataService } from 'src/app/modules/shared/services/session-data.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  animations: [anim]
})
export class LayoutComponent implements OnInit {

  role: string = null;
  constructor(private sessionDataService: SessionDataService) { }

  ngOnInit() {
    this. role =  this.sessionDataService.getRole();
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData.animation && outlet.activatedRouteData['animation'];
  }

}
