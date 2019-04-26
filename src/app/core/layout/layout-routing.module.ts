import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from 'src/app/core/guards/admin.guard';
import { LayoutComponent } from './layout.component';


const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'dishes',
        loadChildren: '../../modules/dishes/dish.module#DishModule',
        canActivate: [AdminGuard]
      },
      {
        path: 'products',
        loadChildren: '../../modules/products/products.module#ProductsModule'
      },
      {
        path: 'user',
        loadChildren: '../../modules/user/user.module#UserModule'
      },
      {
        path: 'chef',
        loadChildren: '../../modules/chef/chef.module#ChefModule'
      },
      {
        path: 'orders-suppliers',
        loadChildren: '../../modules/orders-suppliers/orders-suppliers.module#OrdersSuppliersModule'
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
