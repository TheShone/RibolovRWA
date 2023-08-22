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

export const createPostFailure=createAction(
    '[Komentari Page] Post komentar failure',
    props<{error:string}>()
)