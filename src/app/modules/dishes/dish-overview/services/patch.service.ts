import { Injectable } from '@angular/core';
import { StateService } from '../../services/state.service';
import { IPatch } from '../../models/patch.interface';


@Injectable({
  providedIn: 'root'
})
export class PatchService {

  constructor(private stateService: StateService) { }
  patchArray: IPatch[] = [];

  toPatch(op: string, path: string, value?: string | number): void {
    const patch: IPatch = { op: op, path: path, value: value };
    this.patchArray.push(patch);
  }

  savePatch(dish_id: number) {
    this.stateService.patch(this.patchArray, dish_id);
    this.patchArray = [];
  }

  clearPatch() {
    this.patchArray = [];
  }


}
