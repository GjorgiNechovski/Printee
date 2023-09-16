import { Pageable, Sort } from './pageable.models';
import { ProductCategory } from './product-category.models';
import { User } from './user.models';

export class Product {
  constructor(
    public id: string,
    public category: ProductCategory,
    public name: string,
    public description: string,
    public unitPrice: number,
    public imageUrl: string,
    public active: boolean,
    public unitsInStock: number,
    public dateCreated: Date,
    public lastUpdated: Date,
    public uid: string,
    public user: User
  ) {}
}

export class PaginatedProducts {
  constructor(
    public content: Product[],
    public pageable: Pageable,
    public last: boolean,
    public totalPages: number,
    public totalElements: number,
    public size: number,
    public number: number,
    public sort: Sort,
    public first: boolean,
    public numberOfElements: number,
    public empty: boolean
  ) {}
}
