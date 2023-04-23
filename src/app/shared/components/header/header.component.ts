import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/api/models/user.model';
import { urls } from '../../urls';
import { Router } from '@angular/router';
import { Right } from 'src/app/api/enums/right.enum';
import { AuthenticateService } from 'src/app/api/services/authenticate.service';
import { ToastrService } from 'ngx-toastr';

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

  constructor(
    private router: Router,
    private authenticateService: AuthenticateService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {}

  isLoggedIn(): boolean {
    const username = localStorage.getItem('isAuthenticated');
    return username ? JSON.parse(username) : null;
  }

  isAdmin(): boolean {
    const right = localStorage.getItem('right');
    if (right && JSON.parse(right) === Right.ADMIN) {
      return true;
    }

    return false;
  }

  logout(): void {
    this.authenticateService.logout().subscribe({
      next: res => {
        this.toastrService.success('Sikeres kijelentkezés');
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('right');
        this.router.navigate(['/' + urls.LOGIN]);
      },
      error: err => {
        this.toastrService.error('Sikertelen kijelentkezés');
      }
    });
  }
}
