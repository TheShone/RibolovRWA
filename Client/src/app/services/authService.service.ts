import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Emitters } from '../emitters/emitters';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  checkAuthentication() {
    this.http
      .get('http://localhost:3000/user/getLoggedUser', {
        withCredentials: true,
      })
      .subscribe(
        (res) => {
          Emitters.authEmmiter.emit(true);
        },
        (err) => {
          Emitters.authEmmiter.emit(false);
        }
      );
  }
  logout() {
    return this.http.post(
      'http://localhost:3000/user/logout',
      {},
      { withCredentials: true }
    );
  }
}
