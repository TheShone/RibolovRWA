import { Injectable } from "@angular/core"
import { Actions, createEffect, ofType } from "@ngrx/effects"
import { RibolovnaMestaService } from "src/app/services/ribolovnaMesta.service"
import * as MojaRibolovnaMestaActions from '../actions/mojaRibMesta.actions'
import { catchError, map, mergeMap, of, tap } from "rxjs"
import { RibolovnoMestoModel } from "../types/ribolovnoMesto.module"
import { Update } from "@ngrx/entity";

@Injectable()
export class MojaRibMestaEffects{

    getMojaRibolovnaMesta$ = createEffect(()=>
    this.actions$.pipe(
        ofType(MojaRibolovnaMestaActions.getMojaRibolovnaMesta),
        mergeMap((action)=>this.ribolovnaMestaService.getMojaRibolovnaMesta(action.id).pipe(
            map((ribMesta)=>MojaRibolovnaMestaActions.getMojaRibolovnaMestaSuccess({ribMesta})),
            catchError((error)=>
                of(MojaRibolovnaMestaActions.getMojaRibolovnaMestaFailure({error: error.message})))
        ))
    )
    )
    getRibolovnaMestaFailure$ = createEffect(()=>
    this.actions$.pipe(
        ofType(MojaRibolovnaMestaActions.getMojaRibolovnaMestaFailure),
        tap(()=>alert('Greska pri dobavljanju ribolovnih mesta'))
    ))
    postRibolovnoMesto$ = createEffect(()=>
    this.actions$.pipe(
        ofType(MojaRibolovnaMestaActions.addRibolovnoMesto),
        mergeMap((action)=>this.ribolovnaMestaService.postRibolovnoMesto(action.ribMesto).pipe(
            map((ribMesto)=>MojaRibolovnaMestaActions.addRibolovnoMestoSuccess({ribMesto})),
            catchError((error)=>
            of(MojaRibolovnaMestaActions.addRibolovnoMestoFailure({error: error.message})))
        ))
    )
    )
    postRibolovnoMestoFailure$ = createEffect(()=>
    this.actions$.pipe(
        ofType(MojaRibolovnaMestaActions.addRibolovnoMestoFailure),
        tap(()=>alert("Greska pri dodavanju ribolovnog mesta"))
    ))

    deleteRibolovnoMesto$ = createEffect(()=>
    this.actions$.pipe(
      ofType(MojaRibolovnaMestaActions.deleteRibolovnoMesto),
      mergeMap((action)=>
      this.ribolovnaMestaService.deleteRibolovnoMesto(action.id).pipe(
        map((ribMesto)=>MojaRibolovnaMestaActions.deleteRibolovnoMestoSuccess({id: action.id}))
      ))
    )
    )
    deleteRibolovnoMestoFailure$ = createEffect(()=>
    this.actions$.pipe(
        ofType(MojaRibolovnaMestaActions.deleteRibolovnoMestoFailure),
        tap(()=>alert("Greska pri brisanju ribolovnog mesta"))
    ))
    constructor(private actions$: Actions,private ribolovnaMestaService: RibolovnaMestaService)
    {

    }
}