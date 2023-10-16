import { Component, OnInit } from '@angular/core';
import { ProductFacade } from '../../state/product.state.facade';
import { Product } from 'src/models/product.models';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditProductComponent } from '../edit-product/edit-product.component';

@Component({
  selector: 'app-own-products',
  templateUrl: './own-products.component.html',
  styleUrls: ['./own-products.component.css'],
})
export class OwnProductsComponent implements OnInit {
  products: Product[] = [];
  dataLength = 0;
  currentPage = 1;
  pageSize = 6;

  constructor(
    private productFacade: ProductFacade,
    public modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.productFacade.fetchOwnProducts();
    this.productFacade.getOwnProducts().subscribe((x) => {
      this.products = x.content;
      this.dataLength = x.totalElements;
    });
  }

  openEditProductModal(product: Product) {
    const modalRef = this.modalService.open(EditProductComponent, { size: 'lg' });
    modalRef.componentInstance.product = product;
  }
}
