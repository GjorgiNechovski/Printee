import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-page-label',
  templateUrl: './page-label.component.html',
  styleUrls: ['./page-label.component.css'],
})
export class PageLabelComponent {
  @Input() text = '';
  @Input() showCart = true;
}
