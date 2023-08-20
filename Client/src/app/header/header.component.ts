import { Component, OnInit } from '@angular/core';
import { Emitters } from '../emitters/emitters';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/authService.service';
import { Store, select } from '@ngrx/store';
import { UserState } from '../store/types/user.interface';
import * as UserActions from '../store/actions/user.actions'
import { User } from '../store/types/user.module';
import { selectUserFeature, selectorLoggedin } from '../store/selectors/user.selectors';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  authenticated = true;
  user!: User | null;
  isLoggedIn!: boolean;

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
    private store:Store<UserState>

  ) {
  }
  ngOnInit(): void {
    this.store.pipe(select(selectUserFeature)).subscribe((userState) => {
      this.isLoggedIn = userState.isLoggedIn;
      this.authenticated=userState.isLoggedIn
    });
  }
  logout(): void {
    this.user=null
    this.store.dispatch(UserActions.logOutUser());
  }
}
