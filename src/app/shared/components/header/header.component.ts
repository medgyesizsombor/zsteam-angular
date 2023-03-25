import { Component, OnInit } from '@angular/core';
import { urls } from '../../urls';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  readonly urls = urls;

  constructor() { }

  ngOnInit(): void {
  }

}
