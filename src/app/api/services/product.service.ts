import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly url: string = `${environment.serverUrl}/products`;
  constructor(private httpClient: HttpClient) {}

  /**
   * Összes termék lekérése
   * @returns Összes termék
   */
  getAllProducts(): Observable<Object> {
    return this.httpClient.get(`${this.url}/getAllProducts`, {responseType: 'text'});
  }

  /**
   * Termék lekérése Id alapján
   * @param id Termék Id
   */
  getProductById(id: string) {
    return this.httpClient.get(`${this.url}/getAllProducts`, {responseType: 'text'});
  }

  /**
   * Összes játék lekérése
   * @returns Összes játék
   */
  getAllGames() {
    return this.httpClient.get(`${this.url}/getAllGames`, {responseType: 'text'});
  }

  /**
   * Összes deck lekérése
   * @returns Összes deck
   */
  getAllDecks() {
    return this.httpClient.get(`${this.url}/getAllDecks`, {responseType: 'text'});
  }
}
