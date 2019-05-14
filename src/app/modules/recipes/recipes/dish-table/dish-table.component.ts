import { Component, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { DishesService } from 'src/app/core/http/dishes-data-service/dishes-get-data.service';


@Component({
  selector: 'app-dish-table',
  templateUrl: './dish-table.component.html',
  styleUrls: ['./dish-table.component.scss']
})
export class DishTableComponent implements OnChanges {

  @Input() dish_id: number;
  @Input() isNewOrEditRecipe: boolean;
  @Input() min_prod_value: number = 1;
  @Output() minimum_production = new EventEmitter(true);
  columnsToDisplay = ['name', 'gPP'];
  dataSource = [];
  cachedSource = [];
  isLoading = true;
  disableOnChanges = false;
  constructor(
    private dishesService: DishesService
  ) { }


  ngOnChanges(changes: SimpleChanges): void {
    if (this.dish_id !== null && !this.disableOnChanges) {
      this.getData();
    }
  }

  getData() {
    this.dishesService.getOneDish(this.dish_id)
      .subscribe(dish => {
        this.dataSource = dish.ingredients;
        this.cachedSource = dish.ingredients;
        this.refreshTable(this.min_prod_value);
        this.isLoading = false;
      })
  }

  counter(action: string) {
    if (action === 'add') {
      this.min_prod_value += 1;
      this.refreshTable(this.min_prod_value);
    } else if (action === 'remove') {
      this.min_prod_value -= 1;
      this.refreshTable(this.min_prod_value);
    }
  }

  refreshTable(value: number) {
    this.dataSource = this.cachedSource.map(item => {
      return { name: item.name, gPP: item.gPP * value }
    })
    // Emit the value each time the table is refreshed
    this.minimum_production.emit(value);
    this.disableOnChanges = true;
  }



}
