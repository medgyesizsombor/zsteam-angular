import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AuthenticateService } from 'src/app/api/services/authenticate.service';
import { UserService } from 'src/app/api/services/user.service';
import { urls } from 'src/app/shared/urls';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  readonly urls = urls;

  loginForm: FormGroup = new FormGroup({
    username: new FormControl(),
    password: new FormControl()
  });

  loginSub: Subscription | undefined;

  /**
   * Felhasználónév input
   */
  @ViewChild('username') username: ElementRef | undefined;
  @ViewChild('password') password: ElementRef | undefined;

  constructor(
    private toastrService: ToastrService,
    private authenticateService: AuthenticateService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.createLoginForm();
  }

  ngOnDestroy(): void {
    this.loginSub?.unsubscribe();
  }

  login() {
    const username = this.loginForm?.controls?.['username']?.value;
    const password = this.loginForm?.controls?.['password']?.value;

    this.loginSub = this.authenticateService.login(username, password).subscribe({
      next: res => {
        if (res) {
          this.setRight(username);
          this.toastrService.success('Sikeres bejelentkezés!');
          localStorage.setItem('isAuthenticated', JSON.stringify(username));
          this.router.navigate(['/' + urls.PRODUCTS]);
        } else {
          this.toastrService.error('Sikertelen bejelentkezés!');
        }
      },
      error: err => {
        this.toastrService.error('Sikertelen bejelentkezés!');
      }
    });
  }

  private createLoginForm() {
    this.loginForm = new FormGroup({
      username: new FormControl({ value: null, disabled: false }, [Validators.required]),
      password: new FormControl({ value: null, disabled: false }, [Validators.required])
    });
  }

  private setRight(username: string) {
    this.userService.getUserByUsername(username).subscribe(res => {
      localStorage.setItem('right', JSON.stringify(res[0]?.right));
    });
  }
}
