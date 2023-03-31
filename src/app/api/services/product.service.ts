import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product.model';
import { Result } from '../models/result.model';

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
  getAllProducts(): Observable<Array<Product>> {
    return this.httpClient.get(`${this.url}/getAllProducts`, { responseType: 'text' }).pipe(
      map(res => {
        const result = JSON.parse(res) as Result;
        if (result.message) {
          return [];
        }

        return [...(result.data as Array<Product>)];
      })
    );
  }

  /**
   * Termék lekérése Id alapján
   * @param id Termék Id
   */
  getProductById(productId: string): Observable<Array<Product>> {
    return this.httpClient.get(`${this.url}/getAllProducts?id=${productId}`, { responseType: 'text' }).pipe(
      map(res => {
        const result = JSON.parse(res) as Result;
        if (result.message) {
          return [];
        }

        return [...(result.data as Array<Product>)];
      })
    );
  }

  /**
   * Összes játék lekérése
   * @returns Összes játék
   */
  getAllGames(): Observable<Array<Product>> {
    return this.httpClient.get(`${this.url}/getAllGames`, { responseType: 'text' }).pipe(
      map(res => {
        const result = JSON.parse(res) as Result;
        if (result.message) {
          return [];
        }

        return [...(result.data as Array<Product>)];
      })
    );
  }

  /**
   * Összes deck lekérése
   * @returns Összes deck
   */
  getAllDecks(): Observable<Array<Product>> {
    return this.httpClient.get(`${this.url}/getAllDecks`, { responseType: 'text' }).pipe(
      map(res => {
        const result = JSON.parse(res) as Result;
        if (result.message) {
          return [];
        }

        return [...(result.data as Array<Product>)];
      })
    );
  }

  /**
   * Termék létrehozása
   * @param product Létrehozni kívánt termék
   * @returns
   */
  createProduct(product: Product) {
    return this.httpClient.post(`${this.url}/createProduct`, { product }).pipe(
      map(res => {
        const result = res as Result;
        if (result.message) {
          return {};
        }

        return { ...(result.data as Product) };
      })
    );
  }
  /**
   * Termék szerkesztése
   * @param product Szerkeszteni kívánt termék
   * @returns
   */
  editProduct(product: Product) {
    return this.httpClient.put(`${this.url}/editProduct`, { product }).pipe(
      map(res => {
        const result = res as Result;
        if (result.message) {
          return {};
        }

        return { ...(result.data as Product) };
      })
    );
  }

  /**
   * Termék törlése Id alapján
   * @param productId Törölni kívánt termék Id-ja
   * @returns
   */
  deleteProduct(productId: string) {
    return this.httpClient.delete(`${this.url}/deleteProduct`, { body: { id: productId } }).pipe(
      map(res => {
        const result = res as Result;
        if (result.message) {
          return {};
        }

        return { ...(result.data as Product) };
      })
    );
  }
}
