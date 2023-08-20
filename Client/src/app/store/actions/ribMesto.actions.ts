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