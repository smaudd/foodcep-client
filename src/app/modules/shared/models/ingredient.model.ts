export class Ingredient {
    constructor(public name: string,
                public price: number,
                public loss: number,
                public cost: number,
                public category: string | number,
                public product_id?: number,
                public updatedAt?: string,
                public createdAt?: string,
                public __v?: number
                ) {}
}


