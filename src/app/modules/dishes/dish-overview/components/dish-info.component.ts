import { Component, Output, EventEmitter, Input, OnChanges } from '@angular/core';

import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { IDishInfo } from '../dishInfo.interface';
import { trigger, transition, useAnimation } from '@angular/animations';
import { fadeInOut } from 'src/app/animations/navigation-animations';

@Component({
  selector: 'app-dish-info',
  template: `
            <div>
                    <h3 *ngIf="!dishInfo"><a translate>DISHES.NAME-CATEGORY</a></h3>

                        <div fxLayout="row" *ngIf="dishInfo">
                            <h3> {{ dishInfo.name }} <small>   | {{ dishInfo.category }}</small></h3>
                            <div align="end">
                                <button mat-icon-button>
                                <mat-icon color="accent" *ngIf="isInfoSet" (click)="toggleSet()">edit</mat-icon>
                                <mat-icon color="warn" *ngIf="!isInfoSet" (click)="toggleSet()">cancel</mat-icon>
                                </button>
                        </div>

                    <br>
                    </div>
                    <br>
                    <form *ngIf="!isInfoSet" [formGroup]="dishInfoForm" (ngSubmit)="info(dishInfoForm.value)" fxLayout="column" [@fadeInOut]>
                        <mat-form-field>
                            <input autocomplete="off" matInput placeholder="{{ 'DISHES.DISH-NAME' | translate }}" formControlName="name">
                            <mat-error *ngIf="name.hasError('required')"><a translate>DISHES.NAME-REQUIRED</a></mat-error>
                            <mat-error *ngIf="name.hasError('pattern')"><a translate>DISHES.ONLY-LETTERS</a></mat-error>
                        </mat-form-field>

                        <mat-form-field>
                            <input autocomplete="off" matInput placeholder="{{ 'DISHES.DISH-CATEGORY' | translate }}"
                            formControlName="category">
                            <mat-error *ngIf="category.hasError('required')"><a translate>DISHES.CATEGORY-REQUIRED</a>!</mat-error>
                            <mat-error *ngIf="category.hasError('pattern')"><a translate>DISHES.ONLY-LETTERS</a></mat-error>
                        </mat-form-field>

                        <div align="end">
                            <button mat-button type="submit" [disabled]="dishInfoForm.invalid || dishInfoForm.pristine">OK</button>
                        </div>
                    </form>

                </div>
`,
  animations: [
    trigger('fadeInOut', [
      transition('void => *', [useAnimation(fadeInOut, { params: { time: '.5s' } })])
    ])
  ]
})


export class DishInfoComponent implements OnChanges {


    get name() {
        return this.dishInfoForm.get('name');
      }

    get category() {
        return this.dishInfoForm.get('category');
    }

    @Input() dishInfo: IDishInfo;
    @Output() setInfo = new EventEmitter(true);
    @Output() toggler = new EventEmitter(true);
    dishInfoForm: FormGroup;
    isInfoSet = false;
    constructor(private fb: FormBuilder) {}

    ngOnChanges() {
        this.dishInfoForm = this.fb.group({
            name: new FormControl('', [Validators.required, Validators.pattern('[A-Za-zÑñáéíóúüÁÉÍÓÚ ]*'), Validators.maxLength(50)]),
            category: new FormControl('', [Validators.required, Validators.pattern('[A-Za-zÑñáéíóúüÁÉÍÓÚ ]*'), Validators.maxLength(19)])
        });

        if (this.dishInfo !== undefined) {
            this.isInfoSet = true;
            this.dishInfoForm.get('name').setValue(this.dishInfo.name);
            this.dishInfoForm.get('category').setValue(this.dishInfo.category);
        }
    }

    info(dishInfoForm: IDishInfo) {
        this.dishInfo = dishInfoForm;
        this.isInfoSet = true;
        this.setInfo.emit(this.dishInfo);
        this.toggler.emit(false);
    }

    toggleSet() {
        this.isInfoSet ? this.isInfoSet = false : this.isInfoSet = true;
        this.toggler.emit(true);
      }

}
