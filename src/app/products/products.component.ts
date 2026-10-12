import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'app/product.service';
import { Product } from 'app/models/product';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  category: string;

  constructor(
    route: ActivatedRoute,
    productService: ProductService) {
    productService.getAll().pipe(
      switchMap(products => {
        this.products = products;
        return route.queryParamMap;
      })
    ).subscribe(params => {
      this.category = params.get('category');

      this.filteredProducts = (this.category)
        ? this.products.filter(p => p.category === this.category)
        : this.products;
    });
  }

}
