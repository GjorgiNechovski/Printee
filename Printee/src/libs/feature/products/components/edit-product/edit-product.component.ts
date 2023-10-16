import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProductCategory } from 'src/models/product-category.models';
import { Product } from 'src/models/product.models';
import { ProductFacade } from '../../state/product.state.facade';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
})
export class EditProductComponent implements OnInit {
  @Input() product!: Product;

  editProductGroup = new FormGroup({
    name: new FormControl(),
    description: new FormControl(),
    price: new FormControl(),
    stock: new FormControl(),
    category: new FormControl(),
  });

  categoriesList = new Array<ProductCategory>();

  constructor(
    private facade: ProductFacade,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.facade.getCategories().subscribe((x) => {
      this.categoriesList = x;
      this.editProductGroup.patchValue({
        name: this.product?.name,
        description: this.product?.description,
        price: this.product?.unitPrice,
        stock: this.product?.unitsInStock,
        category: this.product?.category?.uid,
      });
    });
  }

  editProduct(): void {
    const changes = this.editProductGroup.value;

    this.product = {
      ...this.product,
      name: changes.name,
      description: changes.description,
      unitPrice: changes.price,
      unitsInStock: changes.stock,
      category: this.categoriesList.find((category) => category.uid === changes.category) ?? this.product.category,
    };

    this.productService.editProduct(this.product.uid, this.product).subscribe();
  }
}
