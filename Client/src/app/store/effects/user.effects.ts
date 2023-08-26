import { LoginService } from './../../services/loginService.service';
import { AuthService } from './../../services/authService.service';
import { loginUser } from './../actions/user.actions';
import { createAction } from '@ngrx/store';
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as UserActions from '../actions/user.actions'
import { catchError, defer, map, mergeMap, of, switchMap, tap } from 'rxjs';
import { Router } from '@angular/router';


@Injectable()
export class UserEffects{
    loginUser$=createEffect(()=>
    this.actions$.pipe(
        ofType(UserActions.loginUser),
        mergeMap((user)=>{
            return this.loginService.login(user.user.username,user.user.password).pipe(
                map(()=>UserActions.loginUserSuccess({message:"Uspesno"})),
                catchError((error)=>
                    of(UserActions.loginUserFailure({error:error.message}))
                )
            )
        }

        )
    )
    )
    logInUserSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.loginUserSuccess),
            tap(() => {
                this.authService.getLoggedUser().subscribe((user)=>{
                    localStorage.setItem('loggedUser', JSON.stringify(user));
                    localStorage.setItem('isLoggedIn',"true");
                })
                this.router.navigate(['/']);
            })
        ),
        { dispatch: false } 
    );
    logInUserFailure$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.loginUserFailure),
            tap(() => {
                alert("Pogresni username ili sifra")
            })
        ),
        { dispatch: false } 
    );
    logOutUser$ = createEffect(() =>
    this.actions$.pipe(
        ofType(UserActions.logOutUser),
        switchMap(()=>
        this.authService.logout().pipe(
            map(()=> UserActions.logOutUserSuccess({message: "Uspesno izlogovan"})),
            catchError((error)=>of(UserActions.logOutUserFailure({error}))))
        ))
     )
     logOutUserSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.logOutUserSuccess),
            tap(() => {
                localStorage.removeItem("loggedUser")
                localStorage.removeItem('isLoggedIn');                
                this.router.navigate(['/']);

            })
        ),
        { dispatch: false } 
    );
    
    constructor(private actions$: Actions, private loginService:LoginService,private router:Router,private authService: AuthService){
        
    }
}