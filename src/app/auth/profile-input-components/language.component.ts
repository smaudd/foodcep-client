import { Component, Input, OnChanges } from '@angular/core';
import { ProfileService } from '../services/profile.service';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../models/user.model';
import { FormControl } from '@angular/forms';
import { ILanguageChange } from '../models/input.interfaces';
import { StateService } from './state.service';

@Component({
  selector: 'app-language',
  template: `
  <div fxLayout="row">
      <mat-form-field>
              <mat-label><a translate>AUTH.DEFAULT-LENG</a></mat-label>
              <mat-select [formControl]="language">
                  <mat-option value="spa"><a translate>AUTH.SPA</a></mat-option>
                  <mat-option value="en"><a translate>AUTH.EN</a></mat-option>
              </mat-select>
      </mat-form-field>
      <button mat-icon-button *ngIf="language.valid && language.touched" (click)="saveLanguage(language.value)">
              <mat-icon color="warn">check</mat-icon>
      </button>
  </div>
  `,
  styleUrls: ['./input-component.css']
})
export class LanguageComponent implements OnChanges {

    @Input() user: User;
    language = new FormControl;

    constructor(
      private stateService: StateService,
      private translateService: TranslateService) {
   }

    ngOnChanges() {
      this.language.setValue(this.user.language);
    }

    saveLanguage(language: string) {
      const userData: ILanguageChange = {
        id: this.user._id,
        language: language
      };
      this.stateService.changeLanguage(userData, 'api/user/language');
      this.translateService.use(language);
      this.language.reset();
    }
}
