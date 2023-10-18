import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from 'src/models/product.models';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.css'],
})
export class DeleteProductComponent {
  @Input() product!: Product;
  @Output() cancelModal = new EventEmitter<void>();

  constructor(private productService: ProductService) {}

  deleteProduct(): void {
    this.productService.deleteProduct(this.product.uid).subscribe(() => {
      window.location.reload();
      this.cancelModal.emit();
    });
  }
}
