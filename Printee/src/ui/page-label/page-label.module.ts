import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageLabelComponent } from './components/page-label/page-label.component';
import { CartIconComponent } from './components/cart-icon/cart-icon.component';

@NgModule({
  declarations: [PageLabelComponent, CartIconComponent],
  imports: [CommonModule],
  exports: [PageLabelComponent],
})
export class PageLabelModule {}
