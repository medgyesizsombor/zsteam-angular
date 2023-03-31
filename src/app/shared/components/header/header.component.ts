import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/api/models/user.model';
import { AuthenticateService } from 'src/app/api/services/authenticate.service';
import { urls } from '../../urls';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  /**
   * Flag, hogy lehessen használni az urls-t a html fájlban is.
   */
  readonly urls = urls;

  currentUser: User | null = null;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  loggedIn() {
    const username = localStorage.getItem('isAuthenticated');
    return username ? JSON.parse(username) : null;
  }

  logout(): void {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('right');
    this.router.navigate(['/' + urls.LOGIN]);
    /* this.authenticateService.logout().subscribe({
      next: res => {
        this.toastrService.success('Sikeres kijelentkezés');
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('right');
      },
      error: err => {
        localStorage.removeItem('isAuthenticated');
        this.toastrService.error('Sikertelen kijelentkezés');
      }
    }); */
  }
}
