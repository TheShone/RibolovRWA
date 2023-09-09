import { Component, OnInit } from '@angular/core';
import * as UserActions from './store/actions/user.actions'
import { Store, select } from '@ngrx/store';
import { UserState } from './store/types/user.interface';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Clinet';
  constructor(private store:Store<UserState>){

  }
  ngOnInit(): void {
    const userJson=localStorage.getItem('loggedUser');
    if(userJson!= null)
    {
      const userObject = JSON.parse(userJson);
      const currentTime = (new Date()).getTime();
      const expirationTime= userObject.expDate;
      if(currentTime>expirationTime)
      {
        localStorage.removeItem('loggedUser')
        localStorage.removeItem('isLoggedIn')
      }
    }
    let loggedIn = false
    if(localStorage.getItem('isLoggedIn'))
    {
      loggedIn=true;
    }
    else
    {
      loggedIn=false;
    }
    this.store.dispatch(UserActions.browserRolead({ isLoading: false, isLoggedin: loggedIn }));
  }
}
