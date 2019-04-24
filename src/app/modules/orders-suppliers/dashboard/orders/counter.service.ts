import { Injectable } from '@angular/core';

import { interval, fromEvent, Observable } from 'rxjs';
import { map, takeUntil, takeWhile, skip } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CounterService {
  mouseup$ = fromEvent(document, 'mouseup');

  constructor() {}

  // For buttons plus and minus
  clickHoldingHandler(operator: string, previousQuantity: number): Observable<number> {
    const source = interval(300);
    return source.pipe(
      takeUntil(this.mouseup$),
      takeWhile(() => previousQuantity !== 0),
      map(_ => operator === 'sum' ? previousQuantity += 1 : previousQuantity -= 1)
    )
  }

  clickHandler(operator: string, previousQuantity: number): number {
    return operator === 'sum' ? previousQuantity += 1 : previousQuantity -= 1
  }

}
