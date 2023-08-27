import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { RibolovnaMestaService } from "../../services/ribolovnaMesta.service";
import * as KomentarAction from '../actions/komentari.actions'
import { catchError, map, mergeMap, of, tap } from "rxjs";
import { KomentariService } from "src/app/services/komentarService.service";

@Injectable()
export class KomentariEffects{
    getKomentare$=createEffect(()=>
    this.actions$.pipe(
        ofType(KomentarAction.getKomentare),
        mergeMap((action)=>{
            return this.komentariService.getKomentareZaRibolovnMesto(action.id).pipe(
                map((komentari)=>KomentarAction.getKomentareSuccess({komentari})),
                catchError((error)=>of(KomentarAction.getKomentareFailure({error})))
            )
        })
    )
   )
   getKomentareFailure$=createEffect(()=>
        this.actions$.pipe(
            ofType(KomentarAction.getKomentareFailure),
            tap(()=>alert("Greska pri getovanju komentara"))
        )
   )
   postKomentar$=createEffect(()=>
   this.actions$.pipe(
    ofType(KomentarAction.createComment),
    mergeMap((action)=>{
        return this.komentariService.postKomentar(action.komentar).pipe(
            map((komentar)=>KomentarAction.createCommentSuccess({komentar})),
            catchError((error)=>
            of(KomentarAction.createCommentFailure({error:error.message}))
            )
        )
    })
   ))
   postKomentarFailure$=createEffect(()=>
        this.actions$.pipe(
            ofType(KomentarAction.createCommentFailure),
            tap(()=>alert("Greska pri kreiranju komentara"))
        )
   )
   removeKomentar$=createEffect(()=>
   this.actions$.pipe(
    ofType(KomentarAction.deleteComment),
    mergeMap((action)=>{
        return this.komentariService.removeKomentar(action.id).pipe(
            map((id)=>KomentarAction.deleteCommentSuccess({id: action.id})),
            catchError((error)=>
            of(KomentarAction.deleteCommentFailure({error:error.message})))
        )
    })
   ))
   deleteKomentarFailure$=createEffect(()=>
        this.actions$.pipe(
            ofType(KomentarAction.deleteCommentFailure),
            tap(()=>alert("Greska pri brisanju komentara"))
        )
   )
   constructor(private actions$: Actions, private komentariService:KomentariService){

   }

}