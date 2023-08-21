import { createAction, props } from "@ngrx/store";
import { KomentarModel } from "../types/komentar.module";

export const getKomentare = createAction(
    '[Komentari Page], Get Komentare',
    props<{id: number}>()
)
export const getKomentareSuccess = createAction(
    '[Komentari Page] Get Komentare Success',
    props<{komentari: KomentarModel[]}>()
)
export const getKomentareFailure= createAction(
    '[Komentari Page] Get Komentare Failure',
    props<{error: string}>()
)
