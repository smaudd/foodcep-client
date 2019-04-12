import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SortService {

  constructor() { }

  sortList(list: any) {
  const sortedList = list.sort(function(a: any, b: any) {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();
    if  (nameA < nameB) { return -1; }
    if  (nameA > nameB) { return 1; }
    return 0;
  });
  return sortedList;
  }

  sortListByCategory(list: any) {
    const first = this.sortList(list);
    const sortedList = first.sort(function(a: any, b: any) {
      const nameA = a.category.toLowerCase();
      const nameB = b.category.toLowerCase();
      if  (nameA < nameB) { return -1; }
      if  (nameA > nameB) { return 1; }
      return 0;
    });
    return sortedList;
    }

}
