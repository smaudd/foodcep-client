import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeViewerComponent } from './recipes/recipe-viewer/recipe-viewer.component';
import { CreateRecipeComponent } from './recipes/create-recipe/create-recipe.component';

const routes: Routes = [
  {
    path: '',
    component: RecipesComponent
  },
  {
    path: 'view',
    component: RecipeViewerComponent
  },
  {
    path: 'edit',
    component: CreateRecipeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipesRoutingModule { }
