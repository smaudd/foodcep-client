import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { InvitationDialogComponent } from 'src/app/modules/chef/invitation-dialog/invitation-dialog.component';
import { LandComponent } from './land/land.component';
import { HelpDialogComponent } from './help-dialog/help-dialog.component';


@NgModule({
  declarations: [
    NavComponent,
    FooterComponent,
    LayoutComponent,
    InvitationDialogComponent,
    LandComponent,
    HelpDialogComponent
  ],
  imports: [
    LayoutRoutingModule,
    CommonModule,
    SharedModule
  ],
  entryComponents: [ InvitationDialogComponent, HelpDialogComponent ]
})
export class LayoutModule { }
