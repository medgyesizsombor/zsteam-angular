import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Right } from 'src/app/api/enums/right.enum';
import { User } from 'src/app/api/models/user.model';
import { AuthenticateService } from 'src/app/api/services/authenticate.service';
import { UserService } from 'src/app/api/services/user.service';
import { urls } from 'src/app/shared/urls';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {
  users: Array<User> = [];
  readonly urls = urls;
  username: string | undefined;

  loading = false;

  right: Right | undefined;
  rightEnum = Right;

  getAllUsersSub: Subscription | undefined;
  deleteUserSub: Subscription | undefined;

  constructor(
    private userService: UserService,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUser();
    this.loadData();
  }

  ngOnDestroy(): void {
    this.getAllUsersSub?.unsubscribe();
    this.deleteUserSub?.unsubscribe();
  }

  private loadData() {
    this.loading = true;

    if (this.username) {
      this.getAllUsersSub = this.userService.getAllUsers(this.username).subscribe({
        next: res => {
          this.users = res;
          this.loading = false;
        },
        error: err => {
          this.toastrService.error('Hiba a felhasználó betöltésekor!');
          this.loading = false;
        }
      });
    } else {
      this.toastrService.error('Nincs bejelentkezve felhasználó!');
    }
  }

  private loadUser() {
    const username = localStorage.getItem('isAuthenticated');

    if (username) {
      this.username = JSON.parse(username);

      const right = localStorage.getItem('right');

      if (right) {
        this.right = JSON.parse(right);
      }
    }
  }

  onDelete(userId: string | undefined, username: string | undefined) {
    if (userId) {
      if (this.username === username) {
        this.deleteUserSub = this.userService.deleteUser(userId).subscribe({
          next: res => {
            this.toastrService.success('Sikeres törlés!');
            this.loadData();
            localStorage.clear();
            this.router.navigate(['/' + urls.LOGIN]);
          },
          error: err => {
            console.log(err)
            this.toastrService.error('Hiba törlés közben!');
          }
        });
      } else {
        this.deleteUserSub = this.userService.deleteUser(userId).subscribe({
          next: res => {
            this.toastrService.success('Sikeres törlés!');
            this.loadData();
          },
          error: err => {
            this.toastrService.error('Hiba törlés közben!');
          }
        });
      }
    } else {
      this.toastrService.error('Hiba törlés közben!');
    }
  }
}
