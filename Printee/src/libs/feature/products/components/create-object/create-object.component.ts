import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UploadProductsService } from '../../services/upload-products.service';
import { UploadObject } from '../../models/upload.models';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-object.component.html',
  styleUrls: ['./create-object.component.css'],
})
export class CreateObjectComponent {
  constructor(private uploadService: UploadProductsService) {}

  createObjectForm: FormGroup = new FormGroup({
    name: new FormControl<string>(''),
    description: new FormControl<string>(''),
    unitPrice: new FormControl<number>(0),
    image: new FormControl<string>(''),
    unitsInStock: new FormControl<number>(0),
  });

  onSubmit() {
    const formData = this.createObjectForm.value;

    const object = new UploadObject(formData.name, formData.description, formData.unitPrice, formData.image, formData.unitsInStock);

    this.uploadService.uploadObject(object);
  }
}
