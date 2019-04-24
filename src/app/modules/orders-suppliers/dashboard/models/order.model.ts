export class Item  {
  constructor(public name: string, public quantity: number, public unit: string) {}
}

export class Order {
  constructor(public supplier: string, public items: Item[], public madeBy: string, public date?: Date | string, public order_id?: number, public total_items?: number) {}
}
