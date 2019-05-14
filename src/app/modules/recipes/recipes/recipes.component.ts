import { Component, OnInit, OnDestroy } from '@angular/core';
import { fadeInOut } from 'src/app/animations/navigation-animations';
import { trigger, transition, useAnimation } from '@angular/animations';
import { StateService } from './services/state.service';
import { MatDialog } from '@angular/material';
import { Recipe } from '../models/recipe.model';
import { DeleteRecipeDialogComponent } from './delete-recipe-dialog/delete-recipe-dialog.component';
import { Observable, Subscription } from 'rxjs';
import { HelpDialogComponent } from 'src/app/core/layout/help-dialog/help-dialog.component';
import { TranslateService } from '@ngx-translate/core';
import { SessionDataService } from '../../shared/services/session-data.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition('void => *', [useAnimation(fadeInOut, { params: { time: '.3s' } })])
    ])
  ]
})
export class RecipesComponent implements OnInit {

  recipes$: Observable<Recipe[]>;
  loading$ = this.stateService.loading$;
  lang$ = this.translateService.onDefaultLangChange
  role = this.sessionService.getRole();
  newRecipe = false;
  onDelete = false;
  subscription: Subscription
  lang = this.translateService.getDefaultLang()
  src = `assets/documentation/i18n/${this.lang}/manuals/recipes.md`;

  constructor(
    private stateService: StateService,
    private dialog: MatDialog,
    private translateService: TranslateService,
    private sessionService: SessionDataService
  ) {}

  ngOnInit() {
    this.getFromService();
  }

  creatorToggle() {
    this.getFromService();
    this.newRecipe ? this.newRecipe = false : this.newRecipe = true;
  }

  openDeleteDialog(data: Recipe) {
    const dialogRef = this.dialog.open(DeleteRecipeDialogComponent, {
      data: data
    })
    dialogRef.afterClosed().subscribe(_ => this.getFromService());
  }

  getFromService() {
    setTimeout(() => this.recipes$ = this.stateService.get(), 300);
  }

  openHelp() {
    this.dialog.open(HelpDialogComponent, { data: 'recipes.md', height: '90vh' })
  }

  ngOnDestroy() {}

}
