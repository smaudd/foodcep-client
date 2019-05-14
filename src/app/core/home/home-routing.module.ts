import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeLayoutComponent } from './home-layout/home-layout.component';
import { HomeContentComponent } from './home-layout/components/content.component';
import { GetStartedComponent } from './home-layout/components/get-started.component';

const routes: Routes = [
  {
    path: '',
    component: HomeLayoutComponent,
    children: [
      { path: '', component: HomeContentComponent, data: { animation: 'one' }},
      {
        path: 'signin',
        loadChildren: '../signin/signin.module#SigninModule',
        data: { animation: 'two' }

      },
      {
        path: 'login',
        loadChildren: '../auth/auth.module#AuthModule',
        data: { animation: 'four' }

      },
      { path: 'get-started', component: GetStartedComponent, data: { animation: 'three' }}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
