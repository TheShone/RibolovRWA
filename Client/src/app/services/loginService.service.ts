import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string) {
    const formData = { username, password };
    
    return this.http.post('http://localhost:3000/user/login', formData, { withCredentials: true });
  }
}