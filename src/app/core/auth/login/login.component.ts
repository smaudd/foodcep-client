import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../http/auth-service/auth.service';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { SnackbarService } from '../../../modules/shared/services/snackbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: string;
  password: string;

  constructor(private authService: AuthService,
    private router: Router,
    private snackbar: SnackbarService) { }

  ngOnInit() {
  }

  doLogin() {
    const user = new User(this.user, this.password);
    if (this.user === undefined || this.password === undefined) {
      this.snackbar.open('User and password required!', null, 'warning-snackbar', 3000);
      return;
    }
    this.authService.askForCookies(user)
    .subscribe(result => {
      if (result) {
        this.router.navigate(['/']);
      }
    }, error => {
      console.log(error);
      this.snackbar.open('Wrong username or password!', null, 'danger-snackbar', 3000);
      }
    );
  }

}
