import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { InvitationService } from 'src/app/core/http/chef-data-service/invitation-code.service';

interface InvitationData {
  role: string;
}

@Component({
  selector: 'app-invitation-dialog',
  template: `
  <div *ngIf="invitation === null; else codeView" align="center" fxLayout="column">
    <h5>Invite to your team!</h5>
    <mat-form-field appearance="outline">
      <mat-label>Select a role for your invitation</mat-label>
      <mat-select [formControl]="role">
        <mat-option value="sous">Sous</mat-option>
        <mat-option value="cook">Cook</mat-option>
      </mat-select>
    </mat-form-field>
    <button mat-button color="primary" (click)="createCode(role.value)">
      <span translate>Generate Invitation Code</span>
    </button>
  </div>
  <ng-template #codeView>
    <p>Share this code with the person you want to invite to your team.</p>
    <mat-form-field style="width: 100%">
      <input matInput appearence="outline" [disabled]="true" value="{{ invitation.code }}" #code>
    </mat-form-field>
    <div align="center">
      <button mat-raised-button (click)="copyToClipboard(code.value)" color="{{ !isCopied ? null : 'primary' }}">
          <span translate>{{ !isCopied ? 'Copy to clipboard' : 'Code copied to clipboard!' }}</span>
      </button>
    </div>
    <br>
    <small>This code will expire on 24 hours</small>
  </ng-template>
  `,
  styleUrls: ['./invitation-dialog.component.css']
})

export class InvitationDialogComponent {

constructor(
  public dialogRef: MatDialogRef<InvitationDialogComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any,
  private invitationService: InvitationService
  ) {}

  role = new FormControl('', [Validators.required])
  invitation = null;
  isCopied = false;

  onNoClick(): void {
    this.dialogRef.close(undefined);
  }

  createCode(role: string) {
    this.invitationService.generateInvitation(role)
    .subscribe(invitationCode => {
      this.invitation = invitationCode
    })
  }

  copyToClipboard(item) {
    document.addEventListener('copy', (e: ClipboardEvent) => {
      e.clipboardData.setData('text/plain', (item));
      e.preventDefault();
      document.removeEventListener('copy', null);
    });
    document.execCommand('copy');
    this.isCopied = true;
  }


}
