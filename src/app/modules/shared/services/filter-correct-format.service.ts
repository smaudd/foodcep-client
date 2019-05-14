import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilterCorrectFormatService {
  constructor() { }

  filterInput(input: string): string {
    let name = input;
    name = name.trim();
    const firstLetter = name.charAt(0).toUpperCase();
    const restOfWord = name.slice(1, name.length);
    name = firstLetter + restOfWord;
    return name;
}

}
