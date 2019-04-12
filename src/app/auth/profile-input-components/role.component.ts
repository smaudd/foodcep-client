import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { StateService } from './state.service';
import { IRoleChange } from '../models/input.interfaces';
import { User } from '../models/user.model';

@Component({
    selector: 'app-role',
    template:
    `
    <div fxLayout="row">
                    <mat-form-field>
                            <mat-label><a translate>AUTH.ROLE</a></mat-label>
                            <mat-select [formControl]="role" required>
                                <mat-option value="chef">Chef</mat-option>
                                <mat-option value="sous">Sous Chef</mat-option>
                                <mat-option value="cook"><a translate>AUTH.COOK</a></mat-option>
                            </mat-select>
                    </mat-form-field>
                    <button mat-icon-button *ngIf="role.valid && role.touched" (click)="saveRole(role.value)">
                            <mat-icon color="warn">check</mat-icon>
                    </button>
    </div>
    `,
    styleUrls: ['./input-component.css']
  })
export class RoleComponent implements OnChanges {

    // Component rendered by user or admin
    @Input() user: User;
    role = new FormControl;

    constructor(
        // private managerStateService: StateService,
        private stateService: StateService,
        ) {}

    ngOnChanges() {
        this.role.setValue(this.user.role);
    }

    saveRole(role: string) {
        const userData: IRoleChange = {
            email: this.user.email,
            role: role
        };
        this.stateService.changeRole(userData, 'api/admin/changeRole');
        this.role.reset();
    }

}
