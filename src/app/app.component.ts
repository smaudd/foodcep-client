import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  constructor(
    private translate: TranslateService,
    private cookieService: CookieService
  ) {}

  ngOnInit() {
    this.setLanguage();
  }

  setLanguage() {
    const language = this.cookieService.get('LANGUAGE')
    if (language) {
      this.translate.setDefaultLang(language);
      this.translate.use(language);
    } else {
      this.translate.setDefaultLang('spa');
      this.translate.use('spa');
    }
  }

}
