import { Injectable } from "@angular/core"
import { Actions, createEffect, ofType } from "@ngrx/effects"
import { RibolovnaMestaService } from "src/app/services/ribolovnaMesta.service"
import * as MojaRibolovnaMestaActions from '../actions/mojaRibMesta.actions'
import { catchError, map, mergeMap, of } from "rxjs"
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
                of(MojaRibolovnaMestaActions.getMojaRibolovnaMestaFailute({error: error.message})))
        ))
    )
    )
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

    deleteRibolovnoMesto$ = createEffect(()=>
    this.actions$.pipe(
      ofType(MojaRibolovnaMestaActions.deleteRibolovnoMesto),
      mergeMap((action)=>
      this.ribolovnaMestaService.deleteRibolovnoMesto(action.id).pipe(
        map((ribMesto)=>MojaRibolovnaMestaActions.deleteRibolovnoMestoSuccess({id: action.id}))
      ))
    )
    )
    constructor(private actions$: Actions,private ribolovnaMestaService: RibolovnaMestaService)
    {

    }
}