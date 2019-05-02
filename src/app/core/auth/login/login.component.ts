import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../http/auth-service/auth.service';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { SnackbarService } from '../../../modules/shared/services/snackbar.service';
import { FormControl, Validators } from '@angular/forms';
import { VerificationDialogComponent } from './verification-dialog.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);

  constructor(private authService: AuthService,
    private router: Router,
    private dialog: MatDialog
    ) { }

  ngOnInit() {
  }

  doLogin(email: string, password: string) {
    const user = { email, password };
    this.authService.askForCookies(user)
    .subscribe(_ => {},
    error => {
        if (error.status === 422) {
          this.email.setErrors({ 'wrong-credentials': true });
        }
      }
    );
  }

}
