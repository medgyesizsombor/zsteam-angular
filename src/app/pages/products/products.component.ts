import { Component, OnInit } from '@angular/core';
import { ConnectionService } from 'src/app/api/services/connection.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  title = 'random';
  constructor(private connectionService: ConnectionService) {}

  ngOnInit(): void {
    this.connectionService.greet().subscribe({
      next(res) {
        console.log(res);
      },
      error(err) {
        console.log(err);
      }
    });
  }
}
