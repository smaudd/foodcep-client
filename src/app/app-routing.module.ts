import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './core/guards/auth.guard';
import { AdminGuard } from './core/guards/admin.guard';
import { Error404Component } from './core/error-components/error404.component';
import { NavComponent } from './nav/nav.component';

const routes: Routes = [

  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: '',
    component: NavComponent,
    children: [
      {
        path: 'dishes',
        loadChildren: './modules/dishes/dish.module#DishModule',
        canActivate: [AdminGuard]
      },
      {
        path: 'products',
        loadChildren: './modules/products/products.module#ProductsModule'
      },
      {
        path: 'user',
        loadChildren: './modules/user/user.module#UserModule'
      },
      {
        path: 'chef',
        loadChildren: './modules/chef/chef.module#ChefModule'
      },
      {
        path: 'orders-suppliers',
        loadChildren: './modules/orders-suppliers/orders-suppliers.module#OrdersSuppliersModule'
      }
    ]
  },
  {
    path: '',
    loadChildren: './landing-page/landing-page.module#LandingPageModule'
  },

  { path: '404', component: Error404Component },
  // { path: '**', redirectTo: '404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
