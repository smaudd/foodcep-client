import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilterCorrectFormatService {
  pat = new RegExp(/^[a-zA-Z\s]+$/);
  constructor() { }

  filterInput(input: string): string {
    let name = input;
    name = name.trim();
    const firstLetter = name.charAt(0).toUpperCase();
    const restOfWord = name.slice(1, name.length);
    name = firstLetter + restOfWord;
    return name;
}

  filterCategory(input: string): string {
    let name = input;
    name = name.trim();
    if (!this.pat.test(name)) {
      return 'char-not-allowed';
    } else {
      const firstLetter = name.charAt(0).toUpperCase();
        const restOfWord = name.slice(1, name.length);
        name = firstLetter + restOfWord;
        const validFormat = name;
        return validFormat;
    }
  }
}
