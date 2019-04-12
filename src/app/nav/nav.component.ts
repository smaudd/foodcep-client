import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SessionDataService } from '../auth/services/session-data.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-nav-component',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})

export class NavComponent implements OnInit {

  constructor(
    private sessionDataService: SessionDataService,
    private router: Router,
    private authService: AuthService,
    public translateService: TranslateService) { }

  logged = false;
  role: string;
  restaurantName: string;
  userName$: Observable<string>;
  restaurantName$: Observable<string>;
  isLoggedIn$: Observable<boolean>;

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn;
    this.userName$ = this.authService.userName;
    this.restaurantName$ = this.sessionDataService.restaurantName;
    this.authService.userRole.subscribe(response => {
      this.role = response;
    });
  }

  logout() {
    this.logged = false;
    this.authService.logout().subscribe(reply => {
      this.router.navigate(['/login']);
    });
  }

  changeLenguaje(lenguaje: string) {
    this.translateService.use(lenguaje);
  }

}
