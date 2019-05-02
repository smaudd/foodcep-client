import { Injectable } from '@angular/core';

import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Category } from '../../products/categories-list/models/category.model';

import { throwError } from 'rxjs';
import { Dish } from 'src/app/modules/dishes/models/dish.model';
import { ProductsPDFService } from 'src/app/core/http/pdf-data-service/products-pdf.service';
import { TranslateService } from '@ngx-translate/core';
import { DishesPDFService } from 'src/app/core/http/pdf-data-service/dishes-pdf.service';


@Injectable({
  providedIn: 'root'
})
export class PdfRenderService {

  date = new Date();
  constructor(
    private productsPDFService: ProductsPDFService,
    private dishesPDFService: DishesPDFService,
    public translate: TranslateService
    ) { }

  productsPDF(categories: Category[]): void {
    this.productsPDFService.getPDFData()
    .subscribe(val => {
      const doc = new jsPDF();
      let i = 0;
      doc.text(localStorage.getItem('Restaurant'), 100, 20, 'center');
      doc.setFontSize(10);
      doc.text(localStorage.getItem('Adress'), 100, 30, 'center');
      doc.text('+34 ' + localStorage.getItem('Phone'), 100, 35 , 'center');
      doc.text(this.date.toLocaleDateString() , 100, 280, 'center');

      doc.setFontSize(25);
      doc.text('PRODUCTOS', 100, 150, 'center');
      doc.addPage();
      categories.forEach(category => {
        i++;
        const result = val.filter(item => {
          return item.category === category.name;
        });
        doc.setFontSize(16);
        doc.text(category.name, 20, 20);
        doc.autoTable({
          margin: { top: 30 },
          theme: 'grid',
          columns: [
          { header: 'Nombre', dataKey: 'name'},
          { header: 'Precio Por Kilo', dataKey: 'price'},
          { header: 'Merma', dataKey: 'loss'},
          { header: 'Costo', dataKey: 'cost'}
        ],
          body: result,
          });
        if (i !== categories.length) {
          doc.addPage();
        }
      });
      doc.save(localStorage.getItem('Restaurant') + ' ' + 'productos.pdf');
    }, error => {
      alert('Problemas renderizando su PDF');
      return throwError(error);
    });
  }

  dishPDF(dish: Dish) {
    this.dishesPDFService.getPDFData(dish.dish_id)
    .subscribe(val => {
      const doc = new jsPDF();

      doc.text(localStorage.getItem('Restaurant'), 200, 20, 'right');
      doc.setFontSize(10);
      doc.text(localStorage.getItem('Adress'), 200, 30, 'right');
      doc.text('+34 ' + localStorage.getItem('Phone'), 200, 35 , 'right');

      doc.setFontSize(16);
      doc.text('Costo: ' + dish.cost.toFixed(2) + '€', 150, 50);

      doc.setLineWidth(0.2);
      doc.line(10, 40, 200, 40);

      doc.setFontSize(16);
      doc.text(val.name, 20, 50);

      doc.setFontSize(10);
      doc.text(val.category, 20, 55);

      doc.autoTable({
          margin: { top: 60 },
          theme: 'grid',
          columns: [
            { header: 'Nombre', dataKey: 'name' },
            { header: 'Gramos Por Porcion', dataKey: 'gPP' },
            { header: 'Precio Por Porcion', dataKey: 'pPP' }
          ],
          body: val.ingredients
      });
      doc.text(this.date.toLocaleDateString() , 100, 280, 'center');
      doc.save(val.name + '.pdf');
    });
  }


}
