import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Result } from '../models/result.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly url: string = `${environment.serverUrl}/users`;

  constructor(private httpClient: HttpClient) {}

  /**
   * Összes felhasználó lekérése
   * @returns Összes felhasználó
   */
  getAllUsers(username: string): Observable<Array<User>> {
    return this.httpClient.get(`${this.url}/getAllUsers?username=${username}`).pipe(
      map(res => {
        const result = res as Result;
        if (result.message) {
          return [];
        }

        return [...(result.data as Array<User>)];
      })
    );
  }

  /**
   * Lekéri a felhasználót az Id alapján
   * @param userId Felhasználó Id-ja
   * @returns
   */
  getUserById(userId: string): Observable<Array<User>> {
    return this.httpClient.get(`${this.url}/getUserById?id=${userId}`, { responseType: 'text' }).pipe(
      map(res => {
        const result = JSON.parse(res) as Result;
        if (result.message) {
          return [];
        }

        return [...(result.data as Array<User>)];
      })
    );
  }

  /**
   * Lekéri a felhasználót a felhasználónév alapján
   * @param username Felhasználó felhasználóneve
   * @returns
   */
  getUserByUsername(username: string): Observable<Array<User>> {
    return this.httpClient.get(`${this.url}/getUserByUsername?username=${username}`, { responseType: 'text' }).pipe(
      map(res => {
        const result = JSON.parse(res) as Result;
        if (result.message) {
          return [];
        }

        return [...(result.data as Array<User>)];
      })
    );
  }

  /**
   * Létrehoz egy felhasználót
   * @param user Felhasználó modell
   * @returns
   */
  createUser(user: User) {
    return this.httpClient.post(`${this.url}/createUser`, { user }, { withCredentials: true });
  }

  /**
   * Felhasználó szerkesztése
   * @param user
   * @returns
   */
  editUser(user: User) {
    return this.httpClient.put(`${this.url}/editUser`, { user });
  }

  /**
   * Felhasználó törlés Id alapján
   * @param userId Törlendő felhasználó Id-ja
   * @returns
   */
  deleteUser(userId: string) {
    return this.httpClient.delete(`${this.url}/deleteUser`, { body: { id: userId } }).pipe(
      map(res => {
        const result = res as Result;
        if (result.message) {
          return {};
        }

        return { ...(result.data as User) };
      })
    );
  }
}
