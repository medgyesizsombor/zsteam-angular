import { Component, OnInit } from '@angular/core';
import { urls } from 'src/app/shared/urls';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {
  readonly urls = urls;

  constructor() { }

  ngOnInit(): void {
  }

}
