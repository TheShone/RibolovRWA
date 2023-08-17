import { Component, OnInit } from '@angular/core';
import * as UserActions from './store/actions/user.actions'
import { Store, select } from '@ngrx/store';
import { UserState } from './store/types/user.interface';

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
    this.store.dispatch(UserActions.browserRolead({isLoading:false,isLoggedin:true}))
  }
}
