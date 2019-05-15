import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home-content',
  template: `
  <app-home-header></app-home-header>
  <div fxLayout="row" fxLayoutAlign="center">
  <div>
    <div>
      <div fxLayout="column">
        <markdown class="box-paragraph" [src]="src"></markdown>
      </div>
      <br><br>
      <div align="center">
        <button mat-button style="width: 100%" routerLink="signin">
          <span translate>HOME.START</span>
        </button>
      </div>
    </div>
  </div>
  `,
  styleUrls: ['../home-layout.component.scss']
})
export class HomeContentComponent {
  constructor(private translateService: TranslateService) {}
  lang = this.translateService.getDefaultLang();
  src = `assets/documentation/i18n/${this.lang}/home.md`;
  subscription: Subscription;

  ngOnInit() {
    this.subscription = this.translateService.onDefaultLangChange
    .subscribe(value => {
      this.src = `assets/documentation/i18n/${value.lang}/home.md`
    })
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }
}
