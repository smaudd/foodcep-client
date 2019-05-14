import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from 'src/app/core/guards/admin.guard';
import { LayoutComponent } from './layout.component';
import { LandComponent } from './land/land.component';
import { CookGuard } from '../guards/cook.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: LandComponent,
        canActivate: [CookGuard],
      },
      {
        path: 'dishes',
        loadChildren: '../../modules/dishes/dish.module#DishModule',
        canActivate: [CookGuard],
        data: { animation: 'one' }
      },
      {
        path: 'products',
        loadChildren: '../../modules/products/products.module#ProductsModule',
        canActivate: [CookGuard],
        data: { animation: 'two' }
      },
      {
        path: 'user',
        loadChildren: '../../modules/user/user.module#UserModule',
        data: { animation: 'three' }
      },
      {
        path: 'chef',
        loadChildren: '../../modules/chef/chef.module#ChefModule',
        canActivate: [AdminGuard],
        data: { animation: 'four' }
      },
      {
        path: 'orders-suppliers',
        loadChildren: '../../modules/orders-suppliers/orders-suppliers.module#OrdersSuppliersModule',
        canActivate: [CookGuard],
        data: { animation: 'five' }
      },
      {
        path: 'recipes',
        loadChildren: '../../modules/recipes/recipes.module#RecipesModule',
        data: { animation: 'six' }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
