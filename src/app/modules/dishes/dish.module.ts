import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { DishRoutingModule } from './dish-routing.module';

import { DishesManagerComponent } from './dishes-manager.component';
import { DishOverviewComponent } from './dish-overview/dish-overview.component';
import { DishesDashboardComponent } from './dishes-dashboard/dishes-dashboard.component';
import { DeleteDashboardDialogComponent } from './dishes-dashboard/delete-dashboard-dialog/delete-dashboard-dialog.component';
import { DishInfoComponent } from './dish-overview/components/dish-info.component';
import { IngredientBoxComponent } from './dish-overview/components/ingredient-box.component';


@NgModule({
  declarations: [
    DishesManagerComponent,
    DishOverviewComponent,
    DishesDashboardComponent,
    DeleteDashboardDialogComponent,
    DishInfoComponent,
    IngredientBoxComponent
  ],
  imports: [
    DishRoutingModule,
    SharedModule,
  ],
  entryComponents: [ DeleteDashboardDialogComponent ]

})
export class DishModule { }
