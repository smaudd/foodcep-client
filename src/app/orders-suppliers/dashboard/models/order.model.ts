export class Item  {
  constructor(public name: string, public quantity: number, public unit: string) {}
}

export class Order {
  constructor(public supplier: string, public orderContent: Item, public date?: Date | string, public _id?: string) {}
}
