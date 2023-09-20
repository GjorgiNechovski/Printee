import { Pageable, Sort } from './pageable.models';
import { PrintStudio } from './print-studio.models';
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
    public unitsInStock: number,
    public dateCreated: Date,
    public uid: string,
    public printStudio: PrintStudio,
    public user: User,
    public quantity: number
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
