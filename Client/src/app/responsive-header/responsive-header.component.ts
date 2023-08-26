import { Component, OnInit } from '@angular/core';
import { UserModel } from '../store/types/user.module';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/authService.service';
import { UserState } from '../store/types/user.interface';
import { Store, select } from '@ngrx/store';
import { selectUserFeature } from '../store/selectors/user.selectors';
import * as UserActions from '../store/actions/user.actions'

@Component({
  selector: 'app-responsive-header',
  templateUrl: './responsive-header.component.html',
  styleUrls: ['./responsive-header.component.css']
})
export class ResponsiveHeaderComponent implements OnInit {
  authenticated = true;
  user!: UserModel | null;
  isLoggedIn!: boolean;
  isAdmin!: boolean;
 constructor(
  private httpClient: HttpClient,
    private authService: AuthService,
    private store:Store<UserState>
 ){}
 menuVariable:boolean = true;
 openMenu(){
  this.menuVariable = !this.menuVariable;
 }
 ngOnInit(): void {
  this.store.pipe(select(selectUserFeature)).subscribe((userState) => {
    this.isLoggedIn = userState.isLoggedIn;
    this.authenticated=userState.isLoggedIn
  });
  const userJson=localStorage.getItem('loggedUser');
    if(userJson!= null)
    {
      const userObject = JSON.parse(userJson);
      const role = userObject.role;
      if(role==='admin')
        this.isAdmin=true;
      console.log(this.isAdmin)
    }
}
logout(): void {
  this.user=null
  this.store.dispatch(UserActions.logOutUser());
}
}
