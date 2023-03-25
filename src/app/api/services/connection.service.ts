import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {
  private readonly url: string = environment.serverUrl;

  constructor(private httpClient: HttpClient) {}

  greet(): Observable<Object> {
    return this.httpClient.get(`${this.url}/products/getAllProducts`, {responseType: 'text'});
  }
}
