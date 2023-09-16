import { Product } from './product.models';

export class PrintStudio {
  constructor(
    public id: number,
    public name: string,
    public email: string,
    public password: string,
    public uid: string,
    public products: Product[]
  ) {}
}
