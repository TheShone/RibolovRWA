import { createAction, props } from "@ngrx/store";
import { RibolovnoMestoModel } from "../types/ribolovnoMesto.module";

export const getMojaRibolovnaMesta = createAction(
    '[Moja Ribolovna Mesta Page] Get Moja Ribolovna Mesta]',
    props<{id:number}>()
)
export const getMojaRibolovnaMestaSuccess = createAction(
    '[Moja Ribolovna Mesta Page] Get Moja Ribolovna Mesta success',
    props<{ribMesta: RibolovnoMestoModel[]}>()
)
export const getMojaRibolovnaMestaFailute = createAction(
    '[Moja Ribolovna Mesta Page] Get Moja Ribolovna Mesta failure',
    props<{error:string}>()
)
export const addRibolovnoMesto = createAction(
    '[Moja Ribolovna Mesta Page] Add Ribolovno Mesto',
    props<{ribMesto:RibolovnoMestoModel}>()
)
export const addRibolovnoMestoSuccess = createAction(
    '[Moja Ribolovna Mesta Page] Add Ribolovno Mesto Success',
    props<{ribMesto:RibolovnoMestoModel}>()
)
export const addRibolovnoMestoFailure = createAction(
    '[Moja Ribolovna Mesta Page] Add Ribolovno Msto Failure',
    props<{error:string}>()
)