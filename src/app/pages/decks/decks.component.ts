import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Right } from 'src/app/api/enums/right.enum';
import { Product } from 'src/app/api/models/product.model';
import { ProductService } from 'src/app/api/services/product.service';
import { urls } from 'src/app/shared/urls';

@Component({
  selector: 'app-decks',
  templateUrl: './decks.component.html',
  styleUrls: ['./decks.component.scss']
})
export class DecksComponent implements OnInit {
  readonly urls = urls;
  decks: Array<Product> = [];

  loading = false;

  deleteSub: Subscription | undefined;
  getAllDecksSub: Subscription | undefined;

  right: Right | undefined;
  rightEnum = Right;

  constructor(private productService: ProductService, private toastrService: ToastrService) {}

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    this.deleteSub?.unsubscribe();
    this.getAllDecksSub?.unsubscribe();
  }

  onDelete(deckId: string | undefined) {
    if (deckId) {
      this.deleteSub = this.productService.deleteProduct(deckId).subscribe({
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

  private loadData() {
    this.loading = true;
    this.getAllDecksSub = this.productService.getAllDecks().subscribe({
      next: res => {
        if (res) {
          this.decks = res;
          this.loading = false;
          this.getRight();
        }
      },
      error: err => {
        this.toastrService.error('Hiba a deckek betöltésekor!');
        this.loading = false;
      }
    });
  }

  private getRight() {
    const right = localStorage.getItem('right');

      if (right) {
        this.right = JSON.parse(right);
      }
  }
}
