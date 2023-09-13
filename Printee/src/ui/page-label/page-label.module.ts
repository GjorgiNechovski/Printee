import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageLabelComponent } from './components/page-label/page-label.component';

@NgModule({
  declarations: [PageLabelComponent],
  imports: [CommonModule],
  exports: [PageLabelComponent],
})
export class PageLabelModule {}
