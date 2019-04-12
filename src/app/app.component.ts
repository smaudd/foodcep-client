import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  constructor(private translate: TranslateService) {}

    setLanguage() {
      const language = localStorage.getItem('Language');
      if (language) {
        this.translate.setDefaultLang(language);
        this.translate.use(language);
      } else {
        this.translate.setDefaultLang('spa');
        this.translate.use('spa');
      }
    }

  ngOnInit() {
    this.setLanguage();
  }

}
