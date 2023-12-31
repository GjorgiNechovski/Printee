import { Product } from './product.models';

export class User {
  constructor(
    public name: string,
    public lastName: string,
    public email: string,
    public password: string,
    public uid?: string,
    public role?: string,
    public products?: Product[]
  ) {}
}

export class AuthUser {
  constructor(
    public role: string,
    public name: string,
    public lastName: string,
    public uid: string,
    public email: string
  ) {}
}
