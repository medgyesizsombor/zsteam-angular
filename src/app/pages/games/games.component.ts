import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/api/services/product.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getAllGames().subscribe({
      next(res) {
        console.log(res);
      },
      error(err) {
        console.log(err);
      }
    });
  }
}
