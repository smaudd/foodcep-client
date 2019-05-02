import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from 'src/app/core/guards/admin.guard';
import { SigninComponent } from './signin/signin.component';


const routes: Routes = [
  {
    path: '',
    component: SigninComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SigninRoutingModule { }
