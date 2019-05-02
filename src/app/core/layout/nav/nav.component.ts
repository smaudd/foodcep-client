import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SessionDataService } from '../../../modules/shared/services/session-data.service';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../http/auth-service/auth.service';
import { MatDialog } from '@angular/material';
import { InvitationDialogComponent } from 'src/app/modules/chef/invitation-dialog/invitation-dialog.component';

@Component({
  selector: 'app-nav-component',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})

export class NavComponent implements OnInit {

  constructor(
    private sessionDataService: SessionDataService,
    private router: Router,
    private authService: AuthService,
    public translateService: TranslateService,
    private dialog: MatDialog
    ) { }

  logged = false;
  role: string;
  restaurantName: string;
  userName$: Observable<string>;
  restaurantName$: Observable<string>;
  isLoggedIn$: Observable<boolean>;

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn;
    this.userName$ = this.authService.userName;
    this.restaurantName$ = this.sessionDataService.restaurantName;
    this.authService.userRole.subscribe(response => {
      this.role = response;
    });
  }

  logout() {
    this.logged = false;
    this.authService.logout().subscribe();
  }

  changeLanguage(language: string) {
    this.translateService.use(language);
  }


  openInvitationDialog(): void {
    const dialogEditRef = this.dialog.open(InvitationDialogComponent, {
      width: '550px',
      data: { calilo: 'null' }
    });
  }
}
