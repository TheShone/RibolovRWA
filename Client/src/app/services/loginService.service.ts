import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import { UserModel } from '../store/types/user.module';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string): Observable<UserModel> {
    const formData = { username, password };
    return this.http.post<UserModel>('http://localhost:3000/user/login', formData, { withCredentials: true });
  }
}