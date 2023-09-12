import { Component, OnInit } from '@angular/core';
import { ProductFacade } from '../state/product.state.facade';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  constructor(private productFacade: ProductFacade){}

  ngOnInit(): void {
    this.productFacade.fetchProducts()
     this.productFacade.getProducts().subscribe(x=>console.log(x))
  }
}
