import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UserService } from "src/app/services/useriService.service";
import * as UseriActions from '../actions/useri.actions'
import { catchError, map, mergeMap, of, tap } from "rxjs";
import { Injectable } from "@angular/core";
@Injectable()
export class UseriEffects{
    getUsere$ = createEffect(()=>
    this.actions$.pipe(
        ofType(UseriActions.getUsere),
        mergeMap(()=>this.userService.getAllUsers().pipe(
            map((useri)=>UseriActions.getUsereSuccess({useri})),
            catchError((error)=>of(UseriActions.getUsereFailure({error})))
        ))
    )
    )
    // getUsereFailure$ = createEffect(()=>
    // this.actions$.pipe(
    //     ofType(UseriActions.getUsereFailure),
    //     tap(()=>alert('Greska pri pribavljanju Usera'))
    // ))
    deleteUser$ = createEffect(()=>
    this.actions$.pipe(
        ofType(UseriActions.deleteUser),
        mergeMap((action)=>this.userService.deleteUser(action.id).pipe(
            map((user)=>UseriActions.deleteUserSuccess({id:action.id})),
            catchError((error)=>of(UseriActions.deleteUserFailure(error)))
        ))
    ))
    deleteUserFailure$ = createEffect(()=>
    this.actions$.pipe(
        ofType(UseriActions.deleteUserFailure),
        tap(()=>alert('Greska pri brisanju Usera'))
    ))
    constructor(private actions$: Actions,private userService:UserService){

    }
}