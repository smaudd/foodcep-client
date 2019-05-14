import { Component, OnInit, OnChanges, EventEmitter, Output, Input, SimpleChanges, AfterViewInit } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CurrenciesService } from 'src/app/core/http/user-profile-data-service/currencies.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html'
})
export class UserFormComponent implements OnChanges, OnInit {

    get name() { return this.userForm.get('name'); }
    get email() { return this.userForm.get('email');}
    get password() { return this.userForm.get('password');}
    get confirmPassword() { return this.userForm.get('confirmPassword');}
    get code() { return this.userForm.get('code');}
    get language() { return this.userForm.get('language');}
    get currency() { return this.userForm.get('currency');}
    @Input() isWithCode: boolean;
    @Input() errors: number;
    @Output() stepDone = new EventEmitter();
    passwordValue: any;
    matcher = new ErrorStateMatcher;
    userForm: FormGroup;
    subscription: Subscription;
    currencies$ = this.currenciesService.getCurrencies();

    constructor(public fb: FormBuilder, private currenciesService: CurrenciesService) {
      this.userForm = this.fb.group({
        email: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(30)]),
        name: new FormControl('', [Validators.required, Validators.pattern('[A-Za-zÑñáéíóúüÁÉÍÓÚ ]*'), Validators.minLength(5), Validators.maxLength(30)]),
        password: new FormControl('', [Validators.required, Validators.pattern('^(?=.*?[a-z])(?=.*?[0-9]).{8,}$'), Validators.minLength(2), Validators.maxLength(19)]),
        confirmPassword: new FormControl('', [Validators.required, Validators.maxLength(20), Validators.minLength(2)]),
        language: new FormControl('', [Validators.required]),
        currency: new FormControl('', Validators.required),
        code: new FormControl('', [Validators.required])
      });
    }

    ngOnChanges(changes: SimpleChanges) {
      if (changes) {
        // If isn't with code ignore validators for code input
        if (!this.isWithCode) {
          this.userForm.get('code').setValidators([]);
        }

        if (this.errors) {
          switch (this.errors) {
            case 409:
            this.userForm.get('email').setErrors({ 'email-repeated': true });
            break;
            case 422:
            this.userForm.get('code').setErrors({ 'invalid-code': true })
          }
        }
      }
    }

    ngOnInit() {
      this.subscription = this.userForm.get('confirmPassword').valueChanges.subscribe(changes => {
        // Set validator to match the firts input pwd
        const pwd = this.userForm.get('password').value;
        this.userForm.get('confirmPassword').setValidators(Validators.pattern(pwd));
      });
    }

    done(formValue: FormGroup) {
      this.stepDone.emit(formValue);
    }

    ngOnDestroy(): void {
      this.subscription.unsubscribe();
    }

}
