import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Result } from '../models/result.model';

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
    return this.httpClient
      .post(
        `${this.url}/login`,
        {
          username,
          password
        },
        { responseType: 'text' }
      )
      .pipe(
        map(res => {
          const result = JSON.parse(res) as Result;
          if (result.message) {
            return false;
          }

          return true;
        })
      );
  }

  /**
   * Kijelentkezés
   */
  logout() {
    return this.httpClient.post(`${this.url}/logout`, {}, { withCredentials: true });
  }

  status() {
    return this.httpClient.get(`${this.url}/status`);
  }
}
