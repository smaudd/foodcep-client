import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { AuthModule } from '../auth/auth.module';
import { SigninModule } from '../signin/signin.module';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { HomeLayoutComponent } from './home-layout/home-layout.component';
import { HomeNavComponent } from './home-layout/components/nav.component';
import { HomeContentComponent } from './home-layout/components/content.component';
import { HomeFooterComponent } from './home-layout/components/footer.component';
import { GetStartedComponent } from './home-layout/components/get-started.component';
import { HomeHeaderComponent } from './home-layout/components/header.component';
import { MarkdownModule } from 'ngx-markdown';


@NgModule({
  declarations: [
    HomeContentComponent,
    HomeLayoutComponent,
    HomeHeaderComponent,
    HomeFooterComponent,
    GetStartedComponent,
    HomeNavComponent
  ],
  imports: [
    HomeRoutingModule,
    CommonModule,
    AuthModule,
    SigninModule,
    SharedModule,
    MarkdownModule.forChild(),
  ],
  exports: []
})
export class HomeModule { }
