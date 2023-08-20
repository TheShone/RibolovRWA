import { createAction, props } from "@ngrx/store";
import { RibolovnoMestoModel } from "../types/ribolovnoMesto.module";

export const getRibolovnaMesta = createAction(
    '[RibolovnaMesta Page] Get RibolovnaMesta',
)
export const getRibolovnaMestaSuccess = createAction(
    '[RibolovnaMesta Page] Get RibolovnaMesta Success',
    props<{mesta: RibolovnoMestoModel[]}>() 
)
export const getRibolovnaMestaFailure = createAction(
    '[RibolovnaMesta Page] Get RibolovnaMesta Failure',
    props<{error: string}>() 
)