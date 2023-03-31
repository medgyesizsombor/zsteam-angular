import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/api/models/user.model';
import { AuthenticateService } from 'src/app/api/services/authenticate.service';
import { LocalstorageService } from 'src/app/api/services/localstorage.service';
import { UserService } from 'src/app/api/services/user.service';
import { urls } from '../../urls';

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
    private userService: UserService,
    private toastrService: ToastrService,
    private authenticateService: AuthenticateService,
    private localStorageService: LocalstorageService
  ) {}

  ngOnInit(): void {
    this.subscribeToLocalstorage();
  }

  logout(): void {
    this.authenticateService.logout().subscribe({
      next: res => {
        this.toastrService.success('Sikeres kijelentkezés');
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('right');
      },
      error: err => {
        localStorage.removeItem('isAuthenticated');
        this.toastrService.error('Sikertelen kijelentkezés');
      }
    });
  }

  subscribeToLocalstorage() {
    this.localStorageService.getUsernameFromLocalstorage().subscribe({
      next: username => {
        this.setCurrentUser();
      },
      error: err => {
      }
    });
  }

  private setCurrentUser() {
    const username = localStorage.getItem('isAuthenticated');

    if (username) {
      this.userService.getUserByUsername(username).subscribe({
        next: user => {
          if (user) {
            this.currentUser = user[0];
          } else {
            this.currentUser = null;
          }
        },
        error: err => {
          this.toastrService.error('Hiba történt!');
        }
      });
    } else {
      this.currentUser = null;
    }
  }
}
