import { Component, OnInit } from '@angular/core';
import { catchError } from 'rxjs';
import { AuthenticateService } from 'src/app/api/services/authenticate.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  /**
   * Felhasználónév
   */
  username: string | undefined;

  /**
   * Jelszó
   */
  password: string | undefined;

  constructor(private authenticateService: AuthenticateService) {}

  ngOnInit(): void {}

  login() {
    if (this.username?.length && this.password?.length) {
      /* this.authenticateService.login(this.username, this.password).pipe(catchError(err => {})) */
      this.authenticateService.login(this.username, this.password).subscribe(res => {
          console.log(res);

          JSON.stringify

          /* localStorage.setItem('isAuthenticated', JSON.stringify( != null));
         */
        /* error(err) {
          console.log(err);
        } */
      }, err => {
        console.log(err);
      });
    }
  }
}
