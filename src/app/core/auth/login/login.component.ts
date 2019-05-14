import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../http/auth-service/auth.service';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { WelcomeDialogComponent } from './welcome-dialog/welcome-dialog.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);
  @Output() closeMe = new EventEmitter();

  constructor(private authService: AuthService,
    private router: Router,
    private dialog: MatDialog
    ) { }

  ngOnInit() {
  }

  doLogin(email: string, password: string) {
    const user = { email, password };
    this.authService.askForCookies(user)
    .subscribe(_ => {
      this.openWelcomeDialog();
    },
    error => {
        if (error.status === 422) {
          this.email.setErrors({ 'wrong-credentials': true });
          this.password.setErrors({ 'wrong-credentials': true });
        }
      }
    );
  }

  close() {
    this.closeMe.emit(true);
  }

  openWelcomeDialog() {
    this.dialog.open(WelcomeDialogComponent, {
      disableClose: true
    });
  }

}
