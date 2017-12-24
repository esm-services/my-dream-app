import { Component, OnInit } from '@angular/core';
import { IProduct } from 'app/products/product';

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  pageTitle: 'Product Detail';
  product: IProduct;

  constructor() { }

  ngOnInit() {
  }

}
