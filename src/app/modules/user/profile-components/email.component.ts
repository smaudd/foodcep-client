import { Component, Input, OnChanges } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { StateService } from './state.service';
import { IEmailChange } from '../../../core/auth/models/input.interfaces';
import { User } from '../../../core/auth/models/user.model';
import { skip, take } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-email',
    template:
    `
    <div>
        <form [formGroup]="emailForm" fxLayout="row">
                <mat-form-field>
                        <input matInput placeholder="{{ 'AUTH.EMAIL' | translate }}" formControlName="email" autocomplete="off">
                        <mat-error *ngIf="email.hasError('required')"><a translate>AUTH.EMAIL-REQUIRED</a></mat-error>
                        <mat-error *ngIf="email.hasError('email')"><a translate>AUTH.VALID-EMAIL</a></mat-error>
                        <mat-error *ngIf="email.hasError('repeated')"><a translate>AUTH.EMAIL-REPEATED</a></mat-error>
                        <mat-error *ngIf="email.hasError('no-changes')"><a translate>AUTH.NO-CHANGES</a></mat-error>
                </mat-form-field>
                <mat-form-field *ngIf="email.dirty && email.value !== '' && email.value !== user.email">
                        <input matInput type="password" placeholder="{{ 'AUTH.PASSWORD' | translate }}" formControlName="password" #pwd>
                        <mat-error *ngIf="password.hasError('required')"><a translate>AUTH.PASSWORD-REQUIRED</a></mat-error>
                        <mat-error *ngIf="password.hasError('wrong-password')"><a translate>AUTH.WRONG-PWD</a></mat-error>
                </mat-form-field>
                <button mat-icon-button *ngIf="emailForm.valid && emailForm.dirty" (click)="saveEmail(emailForm.value)">
                        <mat-icon color="warn">check</mat-icon>
                </button>
        </form>
    </div>
    `,
    styleUrls: ['./input-component.css']
  })
export class EmailComponent implements OnChanges {

    get email() {
        return this.emailForm.get('email');
    }
    get password() {
        return this.emailForm.get('password');
    }
    emailForm: FormGroup;
    // Component rendered by user or admin
    @Input() user: User;
    @Input() isAdmin: boolean;
    errors$ = this.stateService.errorsSubject;
    errorsSubscription: Subscription;

    constructor(
        private fb: FormBuilder,
        private stateService: StateService
        ) {
            this.emailForm = this.fb.group({
                email: new FormControl('', [Validators.required, Validators.email]),
                password: new FormControl('', [Validators.required])
            });
        }

    ngOnChanges() {
        this.emailForm.get('email').setValue(this.user.email);
    }

    saveEmail(form: any) {
        // Data to be delivered
        const userData: IEmailChange = {
            email: this.user.email,
            password: form.password,
            newEmail: form.email
        };
        this.stateService.updateEmail(userData);
        this.errorHandler();
    }

    errorHandler() {
        // Handles repeated emails and wrong passwords
        this.errorsSubscription = this.errors$
        .pipe(
          skip(1),
          take(1)
        )
        .subscribe(error => {
            if (error) {
                switch (error) {
                    case 422:
                    this.emailForm.get('password').setErrors({ 'wrong-password': 'error' });
                    break;
                    case 409:
                    this.emailForm.get('email').setErrors({ 'repeated': 'error' });
                    break;
                }
            } else {
                this.emailForm.reset();
            }
        });
    }

}
