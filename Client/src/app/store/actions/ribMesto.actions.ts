import { createAction,props } from "@ngrx/store";
import { RibolovnoMestoModel } from "../types/ribolovnoMesto.module";

export const getRibMesto= createAction(
    '[RibolovnoMesto page] Get Ribolovno Mesto',
    props<{id: number}>()
)
export const getRibMestoSuccess=createAction(
    '[RibolovnoMesto page] Get Ribolovno Mesto Success',
    props<{ribMesto: RibolovnoMestoModel}>()
)
export const getRibMestoFailure=createAction(
    '[RibolovnoMesto page] Get Ribolovno Mesto Failure',
    props<{error:string}>()
)
export const updateRibolovnoMesto = createAction(
    '[Moja Ribolovna Mesta Page] Update Ribolovno Mesto',
    props<{ribMesto:RibolovnoMestoModel}>()
)
export const updateRibolovnoMestoSuccess = createAction(
    '[Moja Ribolovna Mesta Page], Update Ribolovno Mesto Success',
    props<{ribMesto:RibolovnoMestoModel}>()
)
export const updateRibolovnoMestoFailure = createAction(
    '[Moja Ribolovna Mesta Page], Update Ribolovno Mesto Failure',
    props<{error:string}>()
)