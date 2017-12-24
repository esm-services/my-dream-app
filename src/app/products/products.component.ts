import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  imageWidth = 50;
  imageMargin = 2;
  showImage = false;
  errorMessage: string;

  _listFilter: string;

  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
  }

  filteredProducts: IProduct[];
  products: IProduct[];

  constructor(private _productService: ProductService) {}

  ngOnInit(): void {
    this._productService.getProducts()
      .subscribe(products => {
        this.products = products;
        this.filteredProducts = this.products;
      },
      error => this.errorMessage = <any>error);
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  performFilter(filterBy: string) {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product: IProduct) =>
      product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  onRatingClicked(message: string): void {
    console.log(message);
  }
}
