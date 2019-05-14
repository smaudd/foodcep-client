import { Component, OnInit, OnDestroy } from '@angular/core';
import { fader } from 'src/app/animations/navigation-animations';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-get-started',
  template: `
  <div class="container" (click)="$event.stopPropagation()" (keydown.tab)="$event.stopPropagation()">
      <markdown [src]="src"></markdown>
      <div>
      <h3>
        <span translate>HOME.SECTIONS</span>
        <hr>
      </h3>
      <mat-accordion *ngIf="!isWaiting">
          <mat-expansion-panel *ngFor="let section of sections">
          <mat-expansion-panel-header>
            <mat-panel-title>
              <span translate>{{ section.name }}</span>
            </mat-panel-title>
          </mat-expansion-panel-header>
              <markdown [src]="section.src"></markdown>
          </mat-expansion-panel>
      </mat-accordion>
      <br><br>
      <button mat-button style="width: 100%" [routerLink]="['/land/signin']">
        <span translate>HOME.START</span>
      </button>
  </div>
  `,
  styleUrls: ['../home-layout.component.scss'],
  animations: [fader]
})
export class GetStartedComponent implements OnInit, OnDestroy {

  constructor(private translateService: TranslateService) {}

  isWaiting = true;
  lang = this.translateService.getDefaultLang();
  src = `assets/documentation/i18n/${this.lang}/get-started.md`
  sections = [];
  subscription: Subscription;

  ngOnInit() {
    this.translateMenu(this.lang);
    setTimeout(() => {
    // Avoid expansion panel to open on render
      this.isWaiting = false;
    }, 100)
    this.subscription = this.translateService.onDefaultLangChange
    .subscribe((event: LangChangeEvent) => {
      this.translateMenu(event.lang);
      this.src = `assets/documentation/i18n/${event.lang}/get-started.md`
    })

  }

  translateMenu(lang: string) {
    if (lang === 'spa') {
      this.sections = [
      { name: 'Restaurante & Equipo', src: 'assets/documentation/i18n/spa/get-started/rnt.md' },
      { name: 'Cuenta', src: 'assets/documentation/i18n/spa/get-started/account.md' },
      { name: 'Productos', src: 'assets/documentation/i18n/spa/get-started/products.md' },
      { name: 'Platos', src: 'assets/documentation/i18n/spa/get-started/dishes.md' },
      { name: 'Pedidos & Proveedores', src: 'assets/documentation/i18n/spa/get-started/ons.md' },
      { name: 'Pedidos & Proveedores', src: 'assets/documentation/i18n/spa/get-started/recipes.md' },

      ]
    } else {
      this.sections = [
        { name: 'Restaurant & Team', src: 'assets/documentation/i18n/en/get-started/rnt.md' },
        { name: 'Account', src: 'assets/documentation/i18n/en/get-started/account.md' },
        { name: 'Products', src: 'assets/documentation/i18n/en/get-started/products.md' },
        { name: 'Dishes', src: 'assets/documentation/i18n/en/get-started/dishes.md' },
        { name: 'Orders & Suppliers', src: 'assets/documentation/i18n/en/get-started/ons.md' },
        { name: 'Pedidos & Proveedores', src: 'assets/documentation/i18n/en/get-started/recipes.md' },
      ]
    }

  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

}
