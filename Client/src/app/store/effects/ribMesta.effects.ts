import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as RibMestaActions from '../actions/ribMesta.actions'
import { catchError, map, mergeMap, of, tap } from "rxjs";
import { RibolovnaMestaService } from "src/app/services/ribolovnaMesta.service";
import { Router } from "@angular/router";
@Injectable()
export class RibolovnaMestaEffects{
    getRibolovnaMesta$ = createEffect(()=>
    this.actions$.pipe(
        ofType(RibMestaActions.getRibolovnaMesta),
        mergeMap(()=> {
            return this.ribolovnaMestaService.getAllRibolovnaMesta().pipe(
                map((mesta)=>RibMestaActions.getRibolovnaMestaSuccess({mesta})),
                catchError((error)=>
                of(RibMestaActions.getRibolovnaMestaFailure({error: error.message})))
            )
        })
    )
    )
    getRibolovnaMestaFailure$ = createEffect(()=>
    this.actions$.pipe(
        ofType(RibMestaActions.getRibolovnaMestaFailure),
        tap(()=>alert('Greska pri dobavljanju ribolovnih mesta'))
    ))
    constructor(private actions$: Actions,private ribolovnaMestaService: RibolovnaMestaService,private router: Router){}
}