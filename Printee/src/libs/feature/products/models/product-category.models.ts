import { Product } from "./product.models";

export class ProductCategory {
    constructor(
        public id: number,
        public categoryName: string,
        public products: Product
        ){}
}