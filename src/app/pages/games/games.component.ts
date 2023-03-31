import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Right } from 'src/app/api/enums/right.enum';
import { Product } from 'src/app/api/models/product.model';
import { ProductService } from 'src/app/api/services/product.service';
import { urls } from 'src/app/shared/urls';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit, OnDestroy {
  readonly urls = urls;
  games: Array<Product> = [];

  loading = true;

  deleteSub: Subscription | undefined;
  getAllGamesSub: Subscription | undefined;

  right: Right | undefined;
  rightEnum = Right;

  constructor(private productService: ProductService, private toastrService: ToastrService) {}

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    this.deleteSub?.unsubscribe();
    this.getAllGamesSub?.unsubscribe();
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
    this.getAllGamesSub = this.productService.getAllGames().subscribe({
      next: res => {
        this.games = res;
        this.loading = false;
        this.getRight();
      },
      error: err => {
        this.loading = false;
        this.toastrService.error('Hiba a játékok betöltésekor!');
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
