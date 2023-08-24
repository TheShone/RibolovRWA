import { catchError, map, mergeMap, of } from 'rxjs';
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ProfilService } from "src/app/services/profil.service";
import * as ProfilActions from '../actions/profil.actions'
import { UserModel } from '../types/user.module';
@Injectable()
export class ProfilEffects{

    getProfil$ = createEffect(()=>
        this.actions$.pipe(
            ofType(ProfilActions.getProfil),
            mergeMap((action)=>{
                return this.profileService.getProfil(action.id).pipe(
                    map((profile)=>ProfilActions.getProfilSuccess({profile})),
                    catchError((error)=>
                    of(ProfilActions.getProfileFailure({error: error.message})))
                )
            })
        )
    )
    putProfil$ = createEffect(()=>
    this.actions$.pipe(
        ofType(ProfilActions.updateProfil),
        mergeMap((action)=>{
            return this.profileService.updateProfil(action.user).pipe(
                map((user)=>ProfilActions.updateProfilSuccess({user})),
                catchError((error)=>of(ProfilActions.updateProfilFailure({error:error.message})))
            )
        })
    ))
    constructor(private actions$: Actions,private profileService: ProfilService){}

}