import { Routes } from '@angular/router';
import { NavigationComponent } from './navigation/navigation.component';
import { ProductListComponent } from '../products/components/product-list/product-list.component';
import { ProductComponent } from '../products/components/product/product.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full',
  },
  {
    path: '',
    component: NavigationComponent,
    children: [{ path: 'products', component: ProductListComponent }],
  },
  {
    path: 'product/:uid',
    component: NavigationComponent,
    children: [{ path: 'products', component: ProductComponent }],
  },
  {
    path: '**',
    redirectTo: 'products',
  },
];
