import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { RibolovnaMestaService } from "src/app/services/ribolovnaMesta.service";
import * as RibolovnoMestoActions from '../actions/ribMesto.actions'
import { Injectable } from '@angular/core';
@Injectable()
export class RibolovnoMestoEffects{
    getRibolovnoMesto$ = createEffect(()=>
    this.actions$.pipe(
        ofType(RibolovnoMestoActions.getRibMesto),
        mergeMap((action)=> {
            return this.ribolovnaMestaService.getRibolovnoMestoId(action.id).pipe(
                map((ribMesto)=> RibolovnoMestoActions.getRibMestoSuccess({ribMesto})),
                catchError((error)=>
                 of(RibolovnoMestoActions.getRibMestoFailure({error: error.message})))
            )
        })
    )
    )
    getRibolovnoMestoFailure$ = createEffect(()=>
    this.actions$.pipe(
      ofType(RibolovnoMestoActions.getRibMestoFailure),
      tap(()=>alert("Greska pri pribavljanju ribolovnog mesta"))
    ))
    putRibolovnoMesto$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RibolovnoMestoActions.updateRibolovnoMesto),
      mergeMap((action) =>
        this.ribolovnaMestaService.updateRibolovnoMesto(action.ribMesto).pipe(
          map((ribMesto) => RibolovnoMestoActions.updateRibolovnoMestoSuccess({ribMesto})),
          catchError((error) =>
            of(RibolovnoMestoActions.updateRibolovnoMestoFailure({ error: error.message }))
          )
        )
      )
    )
      );
      putRibolovnoMestoFailure$ = createEffect(()=>
      this.actions$.pipe(
        ofType(RibolovnoMestoActions.updateRibolovnoMestoFailure),
        tap(()=>alert("Greska pri updateovanju ribolovnog mesta"))
      ))
    constructor(private actions$: Actions,private ribolovnaMestaService: RibolovnaMestaService,private router: Router){}
}