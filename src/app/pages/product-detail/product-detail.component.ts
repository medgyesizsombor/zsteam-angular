import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/api/enums/category.enum';
import { Product } from 'src/app/api/models/product.model';
import { ProductService } from 'src/app/api/services/product.service';
import { urls } from 'src/app/shared/urls';
import { Storage } from 'src/app/api/enums/storage.enum';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  product: Product | undefined;
  readonly urls = urls;
  productname: string | undefined;

  isLoading = false;

  category: Category | undefined;
  categoryEnum = Category;

  storage: Storage | undefined;
  storageEnum = Storage;

  getProductSub: Subscription | undefined;
  deleteProductSub: Subscription | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadData();
  }

  ngOnDestroy() {
    this.getProductSub?.unsubscribe();
  }

  private loadData() {
    this.isLoading = true;
    this.getProductSub = this.activatedRoute.queryParamMap.subscribe(queryParams => {
      if (queryParams?.get('id')) {
        this.productService.getProductById(queryParams?.get('id')!).subscribe(res => {
          this.product = res[0];
          this.isLoading = false;
        });
      } else {
        this.toastrService.error('Hiba a felhasználó betöltése közben');
        this.isLoading = false;
        this.router.navigate(['/' + urls.USERS]);
      }
    });
  }
}
