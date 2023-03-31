import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { User } from 'src/app/api/models/user.model';
import { UserService } from 'src/app/api/services/user.service';
import { urls } from 'src/app/shared/urls';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-regist',
  templateUrl: './regist.component.html',
  styleUrls: ['./regist.component.scss']
})
export class RegistComponent implements OnInit, OnDestroy {
  readonly urls = urls;

  registSub: Subscription | undefined;

  registForm: FormGroup = new FormGroup({
    email: new FormControl(),
    username: new FormControl(),
    lastName: new FormControl(),
    firstName: new FormControl(),
    postalCode: new FormControl(),
    address: new FormControl(),
    password: new FormControl()
  });
  constructor(private userService: UserService, private toastrService: ToastrService, private router: Router) {}

  ngOnInit() {
    this.createRegistForm();
  }

  ngOnDestroy() {
    this.registSub?.unsubscribe();
  }

  onSave() {
    if (this.registForm?.controls?.['password']?.value === this.registForm?.controls?.['confirmPassword']?.value) {
      const user: User = {
        id: uuidv4(),
        email: this.registForm?.controls?.['email']?.value,
        username: this.registForm?.controls?.['username']?.value,
        lastName: this.registForm?.controls?.['lastName']?.value,
        firstName: this.registForm?.controls?.['firstName']?.value,
        postalCode: this.registForm?.controls?.['postalCode']?.value,
        password: this.registForm?.controls?.['password']?.value,
        address: this.registForm?.controls?.['address']?.value
      };

      this.registSub = this.userService.createUser(user).subscribe({
        next: res => {
          if (res) {
            this.toastrService.success('Sikeres regisztráció!');
            this.router.navigate(['/' + urls.LOGIN]);
          } else {
            this.toastrService.error('Sikertelen regisztráció!');
          }
        },
        error: err => {
          this.toastrService.error('Sikertelen regisztráció!');
        }
      });
    } else {
      this.toastrService.error('Nem egyeznek a jelszavak!');
    }
  }

  private createRegistForm() {
    this.registForm = new FormGroup({
      email: new FormControl({ value: null, disabled: false }, [Validators.required, Validators.email]),
      username: new FormControl({ value: null, disabled: false }, [Validators.required]),
      lastName: new FormControl({ value: null, disabled: false }, [Validators.required]),
      firstName: new FormControl({ value: null, disabled: false }, [Validators.required]),
      postalCode: new FormControl({ value: null, disabled: false }, [Validators.required]),
      address: new FormControl({ value: null, disabled: false }, [Validators.required]),
      password: new FormControl({ value: null, disabled: false }, [Validators.required]),
      confirmPassword: new FormControl({ value: null, disabled: false }, [Validators.required])
    });
  }
}
