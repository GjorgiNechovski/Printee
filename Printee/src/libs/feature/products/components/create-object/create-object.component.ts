import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProductFacade } from '../../state/product.state.facade';
import { ProductCategory } from 'src/models/product-category.models';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-object.component.html',
  styleUrls: ['./create-object.component.css'],
})
export class CreateObjectComponent implements OnInit {
  constructor(private productFacade: ProductFacade) {}

  categoriesList: ProductCategory[] = [];

  ngOnInit(): void {
    this.productFacade.getCategories().subscribe((x) => (this.categoriesList = x));
  }

  createObjectForm: FormGroup = new FormGroup({
    name: new FormControl<string>(''),
    description: new FormControl<string>(''),
    unitPrice: new FormControl<number>(0),
    image: new FormControl(),
    unitsInStock: new FormControl<number>(0),
    category: new FormControl(),
  });

  uploadImage(): void {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';

    fileInput.addEventListener('change', (event) => {
      const files = (event.target as HTMLInputElement).files;
      if (files !== null) {
        this.createObjectForm.controls['image'].setValue(files[0]);
      }
    });

    fileInput.click();
  }
  onSubmit() {
    const name = this.createObjectForm.controls['name'].value;
    const description = this.createObjectForm.controls['description'].value;
    const price = this.createObjectForm.controls['unitPrice'].value.toString();
    const image = this.createObjectForm.controls['image'].value;
    const stock = this.createObjectForm.controls['unitsInStock'].value.toString();
    const category = this.createObjectForm.controls['category'].value;

    this.productFacade.uploadNewObject(name, description, price, image, stock, category);
  }
}
