import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/api/models/user.model';
import { UserService } from 'src/app/api/services/user.service';
import { urls } from 'src/app/shared/urls';
import { v4 as uuidv4 } from 'uuid';
import { Right } from 'src/app/api/enums/right.enum';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {
  readonly urls = urls;

  isEdit: boolean | undefined;
  title: string | undefined;

  userForm: FormGroup = new FormGroup({
    username: new FormControl(),
    firstName: new FormControl(),
    lastName: new FormControl(),
    email: new FormControl(),
    right: new FormControl(),
    postalCode: new FormControl(),
    address: new FormControl(),
    password: new FormControl(),
    confirmPassword: new FormControl()
  });

  isLoading = false;

  rightArray: Array<Right> = [Right.ADMIN, Right.USER];

  rightEnum = Right;

  user: User | undefined;

  urlSub: Subscription | undefined;
  editUserSub: Subscription | undefined;
  createUserSub: Subscription | undefined;

  constructor(
    private toastrService: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.urlSub = this.activatedRoute.queryParamMap.subscribe(queryParams => {
      if (queryParams?.get('id')) {
        this.isEdit = true;
        this.title = 'Felhasználó szerkesztése';
        this.userService.getUserById(queryParams?.get('id')!).subscribe(res => {
          this.user = res[0];
          this.isLoading = false;
          this.loadData();
        });
      } else {
        this.isEdit = false;
        this.isLoading = false;
        this.title = 'Felhasználó létrehozása';
        this.loadData();
      }
    });
  }

  ngOnDestroy(): void {
    this.urlSub?.unsubscribe();
    this.editUserSub?.unsubscribe();
    this.createUserSub?.unsubscribe();
  }

  onSave() {
    if (this.userForm?.controls?.['confirmPassword']?.value === this.userForm?.controls?.['password']?.value) {
      const user: User = {
        username: this.userForm?.controls?.['username']?.value,
        firstName: this.userForm?.controls?.['firstName']?.value,
        lastName: this.userForm?.controls?.['lastName']?.value,
        email: this.userForm?.controls?.['email']?.value,
        right: this.userForm?.controls?.['right']?.value,
        postalCode: this.userForm?.controls?.['postalCode']?.value,
        address: this.userForm?.controls?.['address']?.value,
        password: this.userForm?.controls?.['password']?.value
      };

      if (this.isEdit) {
        this.editUser(user);
      } else {
        this.saveNewUser(user);
      }
    } else {
      this.toastrService.error('Nem egyeznek a jelszavak!');
    }
  }

  onDelete() {
    if (this.user) {
      this.userService.deleteUser(this.user.id!).subscribe({
        next: res => {
          this.toastrService.success('Sikeres törlés!');
          this.loadData();
        },
        error: err => {
          this.toastrService.error('Hiba törlés közben!');
        }
      });
    } else {
      this.toastrService.error('Hiba törlés közben!');
    }
  }

  private createUserForm() {
    if (this.isEdit) {
      this.userForm = new FormGroup({
        username: new FormControl({ value: null, disabled: false }, [Validators.required]),
        firstName: new FormControl({ value: null, disabled: false }, [Validators.required]),
        lastName: new FormControl({ value: null, disabled: false }, [Validators.required]),
        email: new FormControl({ value: null, disabled: false }, [Validators.required]),
        right: new FormControl({ value: null, disabled: false }, [Validators.required]),
        postalCode: new FormControl({ value: null, disabled: false }, [Validators.required]),
        address: new FormControl({ value: null, disabled: false }, [Validators.required])
      });
    } else {
      this.userForm = new FormGroup({
        username: new FormControl({ value: null, disabled: false }, [Validators.required]),
        firstName: new FormControl({ value: null, disabled: false }, [Validators.required]),
        lastName: new FormControl({ value: null, disabled: false }, [Validators.required]),
        email: new FormControl({ value: null, disabled: false }, [Validators.required]),
        right: new FormControl({ value: null, disabled: false }, [Validators.required]),
        postalCode: new FormControl({ value: null, disabled: false }, [Validators.required]),
        address: new FormControl({ value: null, disabled: false }, [Validators.required]),
        password: new FormControl({ value: null, disabled: false }, [Validators.required]),
        confirmPassword: new FormControl({ value: null, disabled: false })
      });
    }
  }

  private editUser(user: User) {
    const editUser = { id: this.user?.id, ...user };
    this.editUserSub = this.userService.editUser(editUser).subscribe({
      next: res => {
        if (res) {
          this.toastrService.success('Sikeres mentés!');
          this.router.navigate(['/' + urls.USERS]);
        } else {
          this.toastrService.error('Sikertelen mentés!');
        }
      },
      error: err => {
        this.toastrService.error('Sikertelen mentés!');
      }
    });
  }

  private saveNewUser(user: User) {
    const newUser: User = {
      id: uuidv4(),
      ...user
    };
    this.createUserSub = this.userService.createUser(newUser).subscribe({
      next: res => {
        if (res) {
          this.toastrService.success('Sikeres mentés!');
          this.router.navigate(['/' + urls.USERS]);
        } else {
          this.toastrService.error('Sikertelen mentés!');
        }
      },
      error: err => {
        this.toastrService.error('Sikertelen mentés!');
      }
    });
  }

  private loadData() {
    if (this.isEdit) {
      this.createUserForm();
      this.userForm.patchValue({
        username: this.user?.username,
        firstName: this.user?.firstName,
        lastName: this.user?.lastName,
        email: this.user?.email,
        right: this.user?.right ?? this.rightEnum.USER,
        postalCode: this.user?.postalCode,
        address: this.user?.address
      });
    } else {
      this.createUserForm();
      this.userForm.patchValue({
        username: this.user?.username,
        firstName: this.user?.firstName,
        lastName: this.user?.lastName,
        email: this.user?.email,
        right: this.user?.right ?? this.rightEnum.USER,
        postalCode: this.user?.postalCode,
        address: this.user?.address,
        password: this.user?.password,
        confirmPassword: this.user?.password
      });
    }
  }
}
