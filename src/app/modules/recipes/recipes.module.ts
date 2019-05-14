import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipesRoutingModule } from './recipes-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CreateRecipeComponent } from './recipes/create-recipe/create-recipe.component';
import { DishTableComponent } from './recipes/dish-table/dish-table.component';
import { RecipeViewerComponent } from './recipes/recipe-viewer/recipe-viewer.component';
import { DeleteRecipeDialogComponent } from './recipes/delete-recipe-dialog/delete-recipe-dialog.component';


@NgModule({
  declarations: [
    RecipesComponent,
    CreateRecipeComponent,
    DishTableComponent,
    RecipeViewerComponent,
    DeleteRecipeDialogComponent
  ],
  imports: [
    CommonModule,
    RecipesRoutingModule,
    SharedModule
  ],
  entryComponents: [ DeleteRecipeDialogComponent ]
})
export class RecipesModule { }
