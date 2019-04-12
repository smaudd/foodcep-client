import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { StateService } from './state.service';
import { INameChange } from '../models/input.interfaces';
import { User } from '../models/user.model';

@Component({
    selector: 'app-name',
    template:
    `
    <div>
        <form [formGroup]="nameForm" fxLayout="row">
            <mat-form-field style="width: 100%">
                    <input matInput placeholder="{{ 'AUTH.NAME' | translate }}" formControlName="name" autocomplete="off">
                    <mat-error *ngIf="name.hasError('required')"><a translate>AUTH.NAME-REQUIRED</a></mat-error>
            </mat-form-field>
                    <button mat-icon-button *ngIf="name.dirty && name.valid" (click)="saveName(name.value)">
                            <mat-icon color="warn">check</mat-icon>
                    </button>
        </form>
    </div>
    `,
    styleUrls: ['./input-component.css']
  })
export class NameComponent implements OnChanges {

    get name() {
        return this.nameForm.get('name');
    }
    nameForm: FormGroup;
    // Component rendered by user or admin
    @Input() user: User;

    constructor(
        private fb: FormBuilder,
        private stateService: StateService
        ) {
            this.nameForm = this.fb.group({
                name: new FormControl('', [Validators.required])
            });
        }

    ngOnChanges() {
        this.nameForm.get('name').setValue(this.user.name);
    }

    saveName(name: string) {
        const userData: INameChange = {
            email: this.user.email,
            name: name
        };
        this.stateService.changeName(userData, 'api/user/changeName');
        this.nameForm.reset();
    }

}
