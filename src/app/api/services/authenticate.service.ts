import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
  private readonly url: string = `${environment.serverUrl}/authenticate`;

  constructor(private httpClient: HttpClient) {}

  /**
   * Bejelentkezés
   * @param username Felhasználónév
   * @param password Jelszó
   */
  login(username: string, password: string): Observable<Object> {
    return this.httpClient.post(
      `${this.url}/authenticate/login`,
      {
        username,
        password
      },
      { responseType: 'text' }
    );
  }

  /**
   * Kijelentkezés
   */
  logout() {
    return this.httpClient.post(`${this.url}/authenticate/logout`, {}, { withCredentials: true });
  }
}
