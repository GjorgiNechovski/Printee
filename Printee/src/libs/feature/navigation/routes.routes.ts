import { Routes } from '@angular/router';
import { NavigationComponent } from './navigation/navigation.component';
import { ProductComponent } from '../products/components/product.component';

export const routes: Routes = [
  {
    path: '',
    component: NavigationComponent,
    children: [{ path: '', component: ProductComponent }],
  },
  {
    path: '',
    component: NavigationComponent,
    children: [{ path: 'products', component: ProductComponent }],
  },
];
