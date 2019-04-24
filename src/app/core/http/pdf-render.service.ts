import { Injectable } from '@angular/core';

import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Category } from '../../modules/products/categories-list/models/category.model';
import { ProductsService } from './products-data-service/products-get-data.service';
import { throwError } from 'rxjs';
import { Dish } from 'src/app/modules/dishes/models/dish.model';
import { DishesService } from 'src/app/core/http/dishes-data-service/dishes-get-data.service';


@Injectable({
  providedIn: 'root'
})
export class PdfRenderService {

  // date = new Date();
  // constructor(private ingredientsService: IngredientsService, private dishesService: DishesService) { }

  // ingredientsPDF(categories: Category[]) {
  //   this.ingredientsService.getPDF()
  //   .subscribe(val => {
  //     const doc = new jsPDF();
  //     let i = 0;
  //     doc.text(localStorage.getItem('Restaurant'), 100, 20, 'center');
  //     doc.setFontSize(10);
  //     doc.text(localStorage.getItem('Cusine'), 100, 25, 'center');
  //     doc.text(localStorage.getItem('Adress'), 100, 30, 'center');
  //     doc.text('+34 ' + localStorage.getItem('Phone'), 100, 35 , 'center');
  //     doc.text(this.date.toLocaleDateString() , 100, 280, 'center');

  //     doc.setFontSize(25);
  //     doc.text('INGREDIENTS LIST', 100, 150, 'center');
  //     doc.addPage();
  //     categories.forEach(category => {
  //       i++;
  //       const result = val.filter(item => {
  //         return item.category === category.name;
  //       });
  //       doc.setFontSize(16);
  //       doc.text(category.name, 20, 20);
  //       doc.autoTable({
  //         margin: { top: 30 },
  //         theme: 'grid',
  //         columns: [
  //         { header: 'Name', dataKey: 'name'},
  //         { header: 'Price Per Kilo', dataKey: 'pPK'},
  //         { header: 'Loss Per Kilo', dataKey: 'loss'},
  //         { header: 'Cost', dataKey: 'finalPrice'}
  //       ],
  //         body: result,
  //         });
  //       if (i !== categories.length) {
  //         doc.addPage();
  //       }
  //     });
  //     doc.save(localStorage.getItem('Restaurant') + ' ' + 'Ingredients List.pdf');
  //   }, error => {
  //     alert('Problems rendering your PDF');
  //     return throwError(error);
  //   });
  // }

  // dishPDF(dish: Dish) {
  //   this.dishesService.getPDF(dish._id)
  //   .subscribe(val => {
  //     console.log(val);
  //     const doc = new jsPDF();

  //     doc.text(localStorage.getItem('Restaurant'), 200, 20, 'right');
  //     doc.setFontSize(10);
  //     doc.text(localStorage.getItem('Cusine'), 200, 25, 'right');
  //     doc.text(localStorage.getItem('Adress'), 200, 30, 'right');
  //     doc.text('+34 ' + localStorage.getItem('Phone'), 200, 35 , 'right');

  //     doc.setFontSize(16);
  //     doc.text('Total: €' + dish.total.toFixed(3), 150, 50);

  //     doc.setLineWidth(0.2);
  //     doc.line(10, 40, 200, 40);

  //     doc.setFontSize(16);
  //     doc.text(val.name, 20, 50);

  //     doc.setFontSize(10);
  //     doc.text(val.category, 20, 55);

  //     doc.autoTable({
  //         margin: { top: 60 },
  //         theme: 'grid',
  //         columns: [
  //           { header: 'Name', dataKey: 'name' },
  //           { header: 'Grams Per Portion', dataKey: 'gPP' },
  //           { header: 'Price Per Portion', dataKey: 'pPP' }
  //         ],
  //         body: val.ingredients
  //     });
  //     doc.text(this.date.toLocaleDateString() , 100, 280, 'center');
  //     doc.save(val.name + '.pdf');
  //   });
  // }

  // Esto venia de ingredients service ve como meterlo aqui
  // getPDF(): Observable<Ingredient[]> {
  //   return this.http.get<Ingredient[] | any>(this.pdfRoute, httpOptions)
  //   .pipe(
  //     map(json => {
  //       json = this.sortService.sortListByCategory(json);
  //       const table = new Array();
  //       json.forEach(ingredient => {
  //         // Format with units for PDF rendering
  //         ingredient.pPK = '€' + ingredient.pPK;
  //         ingredient.finalPrice = '€' + ingredient.finalPrice;
  //         ingredient.loss = ingredient.loss + 'gr';
  //         table.push(Object.values(ingredient));
  //       });
  //       console.log(json);
  //       return json;
  //     })
  //   );
  // }

}
