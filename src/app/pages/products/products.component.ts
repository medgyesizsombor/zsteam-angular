import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/api/enums/category.enum';
import { Right } from 'src/app/api/enums/right.enum';
import { Product } from 'src/app/api/models/product.model';
import { ProductService } from 'src/app/api/services/product.service';
import { urls } from 'src/app/shared/urls';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {
  readonly urls = urls;
  products: Array<Product> = [];

  categoryEnum = Category;

  loading = false;

  getAllProductsSub: Subscription | undefined;
  deleteSub: Subscription | undefined;

  right: Right | undefined;
  rightEnum = Right;

  constructor(private productService: ProductService, private toastrService: ToastrService) {}

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    this.getAllProductsSub?.unsubscribe();
    this.deleteSub?.unsubscribe();
  }

  private loadData(): void {
    this.loading = true;

    this.getAllProductsSub = this.productService.getAllProducts().subscribe({
      next: res => {
        this.products = res;
        this.loading = false;
        this.getRight();
      },
      error: err => {
        this.toastrService.error('Hiba a termékek betöltésekor!');
        this.loading = false;
      }
    });
  }

  onDelete(productId: string | undefined) {
    if (productId) {
      this.deleteSub = this.productService.deleteProduct(productId).subscribe({
        next: res => {
          this.toastrService.success('Sikeres törlés!');
          this.loadData();
        },
        error: err => {
          this.toastrService.error('Hiba törlés közben!');
        }
      });
    } else {
      this.toastrService.error('Hiba törlés közben!');
    }
  }

  private getRight() {
    const right = localStorage.getItem('right');
    if (right) {
      this.right = JSON.parse(right);
    }
  }
}
