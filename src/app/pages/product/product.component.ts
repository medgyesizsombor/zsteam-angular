import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/api/enums/category.enum';
import { Storage } from 'src/app/api/enums/storage.enum';
import { Product } from 'src/app/api/models/product.model';
import { Result } from 'src/app/api/models/result.model';
import { ProductService } from 'src/app/api/services/product.service';
import { urls } from 'src/app/shared/urls';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {
  readonly urls = urls;

  isEdit: boolean | undefined;
  title: string | undefined;

  productForm: FormGroup = new FormGroup({
    name: new FormControl(),
    price: new FormControl(),
    category: new FormControl(),
    storage: new FormControl()
  });

  isLoading = false;

  categoryArray: Array<Category> = [Category.GAME, Category.DECK];
  storageArray: Array<Storage> = [Storage.BIG, Storage.MIDDLE, Storage.SMALL, Storage.NULL];

  categoryEnum = Category;
  storageEnum = Storage;

  product: Product | undefined;

  urlSub: Subscription | undefined;
  deleteSub: Subscription | undefined;
  editSub: Subscription | undefined;
  createSub: Subscription | undefined;

  constructor(
    private toastrService: ToastrService,
    private router: Router,
    private productService: ProductService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.createProductForm();
    this.isLoading = true;
    this.urlSub = this.activatedRoute.queryParamMap.subscribe(queryParams => {
      if (queryParams?.get('id')) {
        this.isEdit = true;
        this.title = 'Termék szerkesztése';
        this.productService.getProductById(queryParams?.get('id')!).subscribe(res => {
          this.product = res[0];
          this.isLoading = false;
          this.loadData();
        });
      } else {
        this.isEdit = false;
        this.isLoading = false;
        this.title = 'Termék létrehozása';
        this.loadData();
      }
    });
  }

  ngOnDestroy(): void {
    this.urlSub?.unsubscribe();
    this.deleteSub?.unsubscribe();
    this.editSub?.unsubscribe();
    this.createSub?.unsubscribe();
    this.product = undefined;
  }

  onSave() {
    const product: Product = {
      name: this.productForm?.controls?.['name']?.value,
      price: this.productForm?.controls?.['price']?.value,
      category: this.productForm?.controls?.['category']?.value,
      storage: this.productForm?.controls?.['storage']?.value
    };

    if (this.isEdit) {
      this.editProduct(product);
    } else {
      this.saveNewProduct(product);
    }
  }

  onDelete() {
    if (this.product) {
      this.deleteSub = this.productService.deleteProduct(this.product.id!).subscribe({
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

  private createProductForm() {
    this.productForm = new FormGroup({
      name: new FormControl({ value: null, disabled: false }, [Validators.required]),
      price: new FormControl({ value: null, disabled: false }, [Validators.required]),
      category: new FormControl({ value: null, disabled: false }, [Validators.required]),
      storage: new FormControl({ value: null, disabled: false }, [Validators.required])
    });
  }

  private editProduct(product: Product) {
    const editProduct = { id: this.product?.id, ...product };
    this.editSub = this.productService.editProduct(editProduct).subscribe({
      next: res => {
        if (res) {
          this.toastrService.success('Sikeres mentés!');
          this.router.navigate(['/' + urls.PRODUCTS]);
        } else {
          this.toastrService.error('Sikertelen mentés!');
        }
      },
      error: err => {
        this.toastrService.error('Sikertelen mentés!');
      }
    });
  }

  private saveNewProduct(product: Product) {
    const newProduct: Product = {
      id: uuidv4(),
      ...product
    };
    this.createSub = this.productService.createProduct(newProduct).subscribe({
      next: res => {
        if (res) {
          this.toastrService.success('Sikeres mentés!');
          this.router.navigate(['/' + urls.PRODUCTS]);
        } else {
          this.toastrService.error('Sikertelen mentés!');
        }
      },
      error: err => {
        this.toastrService.error('Sikertelen mentés!');
      }
    });
  }

  private loadData() {
    this.productForm.patchValue({
      name: this.product?.name,
      price: this.product?.price,
      category: this.product?.category ?? this.categoryEnum.GAME,
      storage: this.product?.storage ?? this.storageEnum.SMALL
    });
  }
}
