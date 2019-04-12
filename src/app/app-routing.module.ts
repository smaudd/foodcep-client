import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { AdminGuard } from './auth/guards/admin.guard';
import { Error500Component } from './core/error500/error500.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  {
    path: 'dishes',
    loadChildren: './dishes-manager/dish.module#DishModule'
  },
  {
    path: 'ingredients',
    loadChildren: './registre-manager/registre.module#RegistreManagerModule'
  },
  {
    path: 'user',
    loadChildren: './auth/auth.module#AuthModule'
  },
  {
    path: 'orders-suppliers',
    loadChildren: './orders-suppliers/orders-suppliers.module#OrdersSuppliersModule'
  },
  { path: '500', component: Error500Component },
  // { path: '**', redirectTo: '/home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
