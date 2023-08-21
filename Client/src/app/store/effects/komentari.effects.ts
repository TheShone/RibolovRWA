import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { RibolovnaMestaService } from "../../services/ribolovnaMesta.service";
import * as KomentarAction from '../actions/komentari.actions'
import { catchError, map, mergeMap, of } from "rxjs";
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
   constructor(private actions$: Actions, private komentariService:KomentariService){

   }

}