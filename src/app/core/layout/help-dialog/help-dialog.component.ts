import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-help-dialog',
  template: `
  <div>
  <h1 align="center">
    <span translate>HOME.NEED-HELP</span>
  </h1>
  <mat-divider></mat-divider>
  <markdown [src]="src"></markdown>
  </div>
  `
})
export class HelpDialogComponent implements OnInit {

  src: string;
  lang = this.translateService.getDefaultLang();

  constructor(
    public dialogRef: MatDialogRef<HelpDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private translateService: TranslateService
    ) {}

  ngOnInit() {
    this.src = `assets/documentation/i18n/${this.lang}/get-started/${this.data}`;
  }

}
