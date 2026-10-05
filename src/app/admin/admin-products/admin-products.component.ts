import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Product } from 'app/models/product';
import { ProductService } from 'app/product.service';
import { Subscription } from 'rxjs';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: Product[];
  //filteredProducts: any[];
  subscription: Subscription;
  columnsToDisplay = ['position', 'title', 'price', 'edit'];
  dataSource = new MatTableDataSource<Product>();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private productService: ProductService) {
    this.subscription = productService.getAll().subscribe(products => {
      //this.filteredProducts = this.products = products;
      this.dataSource.data = this.products = products;
      this.indexProducts();
      return this.dataSource.data;
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

  filter(query: string) {
    //this.filteredProducts = (query)
    this.dataSource.data = (query)
      ? this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase()))
      : this.products;
    this.indexProducts();
  }

  indexProducts(): void {
    for (let i = 1; i <= this.dataSource.data.length; i++) {
      this.dataSource.data[i - 1].position = i;
    }
  }

}
