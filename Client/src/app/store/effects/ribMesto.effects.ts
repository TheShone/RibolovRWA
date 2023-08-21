import { catchError, map, mergeMap, of } from 'rxjs';
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
    constructor(private actions$: Actions,private ribolovnaMestaService: RibolovnaMestaService,private router: Router){}
}