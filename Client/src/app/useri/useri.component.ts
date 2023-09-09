import { Component, OnInit } from '@angular/core';
import { UserModel } from '../store/types/user.module';
import { Observable } from 'rxjs';
import { UserService } from '../services/useriService.service';
import { Store } from '@ngrx/store';
import { UseriState } from '../store/types/useri.interface';
import { DatePipe } from '@angular/common';
import { isLoadingselector, selectError, useriSelector } from '../store/selectors/useri.selectors';
import * as UseriActions from '../store/actions/useri.actions'
import { UserState } from '../store/types/user.interface';
import { selectorUser } from '../store/selectors/user.selectors';
@Component({
  selector: 'app-useri',
  templateUrl: './useri.component.html',
  styleUrls: ['./useri.component.css']
})
export class UseriComponent implements OnInit {
  isLoading$ : Observable<boolean>;
  error$ : Observable<String | null>;
  useri$ : Observable<UserModel[]>;
  user!: Observable<UserModel | null>;
  isAdmin!: boolean;
  searchText: any
  constructor(private useriService: UserService,private store: Store<UseriState>,private datePipe: DatePipe, private storee:Store<UserState>){
    this.isLoading$=this.store.select(isLoadingselector)
    this.useri$=this.store.select(useriSelector)
    this.error$=this.store.select(selectError)
  }
  getBackgroundStyle(imageUrl: string) {
    return {
      'background-image': `url(${imageUrl})`
    };
  }
  formatDatumPostavljanja(date: Date): string | null {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }
  ngOnInit(): void {
    this.store.dispatch(UseriActions.getUsere())
    this.user = this.store.select(selectorUser)
  const userJson=localStorage.getItem('loggedUser');
    if(this.user)
    {
      this.user.subscribe((user)=>{
        if(user?.role==="admin")
      {
        this.isAdmin=true;
      }
      else
      {
        this.isAdmin=false;
      }
      })
    }
    
      const userObject = JSON.parse(userJson!);
      if(userObject!==null)
      {
        const role = userObject.value.role;
        if(role==='admin')
          this.isAdmin=true;
        else
          this.isAdmin=false;
      }
  }
  deleteUser(id:number){
    if(confirm('Jeste sigurni da zelite da obrisete usera'))
    {
      this.store.dispatch(UseriActions.deleteUser({id}))
    }
  }
}
