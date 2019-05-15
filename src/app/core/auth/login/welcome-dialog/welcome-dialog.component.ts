import { Component, Inject, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/http/auth-service/auth.service';
import { take, delay } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { fader } from 'src/app/animations/navigation-animations';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-delete-recipe-dialog',
  template: `
  <div [@fader]>
    <img style="max-width: 150px; max-height: 150px" src='../../../../../assets/logo/loco-circle.png'>
  </div>
  `,
  animations: [fader]
})
export class WelcomeDialogComponent implements AfterViewInit {


  loginProcess$: Observable<boolean>

  constructor(
    public dialogRef: MatDialogRef<WelcomeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
    private authService: AuthService,
    private translateService: TranslateService,
    private cookieService: CookieService
    ) {}

  ngAfterViewInit(): void {
    this.authService.isloginProcessDone
    .pipe(
      take(1),
      delay(500)
    )
    .subscribe(_ => {
      this.dialogRef.close();
    })
    this.translateService.setDefaultLang(this.cookieService.get('LANGUAGE'));
    this.translateService.use(this.cookieService.get('LANGUAGE'));
  }

}
