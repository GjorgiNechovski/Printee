import { Routes } from '@angular/router';
import { NavigationComponent } from './navigation/navigation.component';
import { ProductListComponent } from '../products/components/product-list/product-list.component';
import { ProductComponent } from '../products/components/product/product.component';
import { CartComponent } from '../cart/components/cart/cart.component';
import { AuthenticationComponent } from '../authentication/components/authentication/authentication.component';
import { AuthGuard } from '../authentication/services/authentication.guard';
import { CreateAccountComponent } from '../authentication/components/create-account/create-account.component';
import { CreateObjectComponent } from '../products/components/create-object/create-object.component';
import { OwnProductsComponent } from '../products/components/own-products/own-products.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full',
  },
  {
    path: '',
    component: NavigationComponent,
    children: [{ path: 'products', component: ProductListComponent, canActivate: [AuthGuard] }],
  },
  {
    path: 'login',
    component: AuthenticationComponent,
  },
  {
    path: 'createAccount',
    component: CreateAccountComponent,
  },
  {
    path: 'product/:uid',
    component: NavigationComponent,
    children: [{ path: '', component: ProductComponent, canActivate: [AuthGuard] }],
  },
  {
    path: 'cart',
    component: NavigationComponent,
    children: [{ path: '', component: CartComponent, canActivate: [AuthGuard] }],
  },
  {
    path: 'ownProducts',
    component: NavigationComponent,
    children: [{ path: '', component: OwnProductsComponent, canActivate: [AuthGuard] }],
  },
  {
    path: 'createObject',
    component: NavigationComponent,
    children: [{ path: '', component: CreateObjectComponent, canActivate: [AuthGuard] }],
  },
  {
    path: '**',
    redirectTo: 'products',
  },
];
