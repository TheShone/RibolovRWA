import { Component, OnInit } from '@angular/core';
import { Emitters } from '../emitters/emitters';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/authService.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  authenticated = false;
  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    Emitters.authEmmiter.subscribe((auth: boolean) => {
      this.authenticated = auth;
    });
  }
  logout(): void {
    localStorage.removeItem('loggedUser');
    this.authService.logout().subscribe(() => {
      this.authenticated = false;
    });
  }
}
