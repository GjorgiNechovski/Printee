import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from 'src/models/product.models';

@Component({
  selector: 'app-change-product-image',
  templateUrl: './change-product-image.component.html',
  styleUrls: ['./change-product-image.component.css'],
})
export class ChangeProductImageComponent {
  @Input() product!: Product;

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  selectedImage: File | null = null;

  constructor(private productService: ProductService) {}

  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files;

    if (files && files.length > 0) {
      this.selectedImage = files[0];

      console.log(this.selectedImage);
    }
  }

  openFileInput() {
    this.fileInput.nativeElement.click();
  }

  confirmImageChange(productUid: string) {
    if (this.selectedImage) {
      this.productService.changeProductImage(productUid, this.selectedImage).subscribe(() => {
        // Handle successful image change, e.g., close the modal or refresh the product data.
      });
    }
  }
}
