import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../../http/auth-service/auth.service';
import { anim } from 'src/app/animations/navigation-animations';

@Component({
  selector: 'app-home-layout',
  templateUrl: './home-layout.component.html',
  styleUrls: ['./home-layout.component.scss'],
  animations: [anim]
})
export class HomeLayoutComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.authService.isLoggedIn
    .subscribe((isLoggedIn: boolean) => {
      if (isLoggedIn) {
        this.router.navigate(['/'])
      }
    })
  }


  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData.animation && outlet.activatedRouteData['animation'];
  }

}
