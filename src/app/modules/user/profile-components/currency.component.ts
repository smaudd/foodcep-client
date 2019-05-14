import { Component, Input, OnChanges } from '@angular/core';
import { User } from '../../../core/auth/models/user.model';
import { FormControl } from '@angular/forms';
import { ICurrencyChange } from '../../../core/auth/models/input.interfaces';
import { StateService } from './state.service';
import { CurrenciesService } from 'src/app/core/http/user-profile-data-service/currencies.service';

@Component({
  selector: 'app-currency',
  template: `
  <div fxLayout="row">
      <mat-form-field appearance="outline">
              <mat-label>
                <span translate>AUTH.CURRENCY</span>
              </mat-label>
              <mat-select [formControl]="currency">
                  <mat-option *ngFor="let currency of currencies$ | async" value="{{currency.symbol}}">
                    <span translate>{{ currency.symbol }}</span>
                  </mat-option>
              </mat-select>
      </mat-form-field>
      <button mat-icon-button *ngIf="currency.valid && currency.touched" (click)="saveCurrency(currency.value)">
              <mat-icon color="warn">check</mat-icon>
      </button>
  </div>
  `,
  styleUrls: ['./input-component.css']
})
export class CurrencyComponent implements OnChanges {

    @Input() user: User;
    currency = new FormControl;
    currencies$ = this.currencyService.getCurrencies();

    constructor(
      private stateService: StateService,
      private currencyService: CurrenciesService
      ) {
   }

    ngOnChanges() {
      this.currency.setValue(this.user.currency);
    }

    saveCurrency(symbol: string) {
      const userData: ICurrencyChange = {
        symbol: symbol,
        user_id: this.user.user_id,
      };
      this.stateService.updateCurrency(userData);
      // this.currency.reset();
    }
}
