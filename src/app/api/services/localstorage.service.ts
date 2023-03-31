import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor() { }

  getUsernameFromLocalstorage(): Observable<string | null> {
    let username = localStorage.getItem('isAuthenticated');

    if (username) {
      username = JSON.parse(username);
    }

    return of(username);
  }
}
