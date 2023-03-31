import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Right } from 'src/app/api/enums/right.enum';
import { User } from 'src/app/api/models/user.model';
import { UserService } from 'src/app/api/services/user.service';
import { urls } from 'src/app/shared/urls';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit, OnDestroy {
  user: User | undefined;
  readonly urls = urls;
  username: string | undefined;

  isLoading = false;

  right: Right | undefined;
  rightEnum = Right;

  getUserSub: Subscription | undefined;
  deleteUserSub: Subscription | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadData();
  }

  ngOnDestroy() {
    this.getUserSub?.unsubscribe();
  }

  private loadData() {
    this.isLoading = true;
    this.getUserSub = this.activatedRoute.queryParamMap.subscribe(queryParams => {
      if (queryParams?.get('id')) {
        this.userService.getUserById(queryParams?.get('id')!).subscribe(res => {
          this.user = res[0];
          this.isLoading = false;
        });
      } else {
        this.toastrService.error('Hiba a felhasználó betöltése közben');
        this.isLoading = false;
        this.router.navigate(['/' + urls.USERS]);
      }
    });
  }
}
