import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl } from '@angular/forms';
import { IDialogData, IDelete } from '../../../../core/auth/models/input.interfaces';
import { StateService } from '../state.service';
import { skip, take } from 'rxjs/operators';
import { AuthService } from '../../../../core/http/auth-service/auth.service';


@Component({
  selector: 'app-delete-account-dialog',
  templateUrl: './delete-account-dialog.component.html',
  styleUrls: ['./delete-account-dialog.component.css']
})
export class DeleteAccountDialogComponent implements OnInit {

  errors$ = this.stateService.errorsSubject;
  password = new FormControl;
  done = false;

  constructor(
    public dialogRef: MatDialogRef<DeleteAccountDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IDialogData,
    private stateService: StateService,
    private authService: AuthService
    ) { }

  ngOnInit() {
  }

  deleteAccount(password?: string) {
      const userData: IDelete = { email: this.data.email, password: password };
      this.stateService.deleteAccount(userData);
      this.errorHandler();
  }

  errorHandler() {
    // Handles repeated emails and wrong passwords
    this.errors$.pipe(
      take(2),
      skip(1)
    )
    .subscribe(value => {
        if (value === 422) {
          this.password.setErrors({ incorrect: true });
            } else {
              this.done = true;
              this.doLogout();
            }
    })
  }

  doLogout() {
    setTimeout(() => {
      this.authService.logout().subscribe();
      this.dialogRef.close();
    }, 3000);
  }
}
