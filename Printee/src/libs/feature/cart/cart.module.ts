import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './components/cart/cart.component';
import { PageLabelModule } from 'src/ui/page-label/page-label.module';

@NgModule({
  declarations: [CartComponent],
  imports: [CommonModule, PageLabelModule],
  exports: [CartComponent],
})
export class CartModule {}
