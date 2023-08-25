import { createAction, props } from "@ngrx/store";
import { KomentarModel } from "../types/komentar.module";
import { UserModel } from "../types/user.module";
import { RibolovnoMestoModel } from "../types/ribolovnoMesto.module";

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

export const createComment = createAction(
    '[Komentari Page] Post komentar',
    props<{ komentar: KomentarModel}>()
)

export const createCommentSuccess= createAction(
    '[Komentari Page] Post komentar success',
    props<{komentar: KomentarModel}>()
)

export const createCommentFailure=createAction(
    '[Komentari Page] Post komentar failure',
    props<{error:string}>()
)
export const deleteComment= createAction(
    '[Komentari Page] Delete Komentar',
    props<{id:number}>()
)
export const deleteCommentSuccess = createAction(
    '[Komentari Page] Delete Komentar Success',
    props<{id: number}>()
)
export const deleteCommentFailure = createAction(
    '[Komentari Page] Delete Komentar Failure',
    props<{error: string}>()
)