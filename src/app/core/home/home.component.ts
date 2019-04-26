import { Component, OnInit } from '@angular/core';
import { AuthService } from '../http/auth-service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-component',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

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

}
