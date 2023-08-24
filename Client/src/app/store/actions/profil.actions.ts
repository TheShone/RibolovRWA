import { createAction, props } from "@ngrx/store";
import { UserModel } from "../types/user.module";

export const getProfil = createAction(
    '[Profile Page] Get Profile',
    props<{id: number}>()
)
export const getProfilSuccess = createAction(
    '[Profile Page] Get Profile Success',
    props<{profile:UserModel}>()
)
export const getProfileFailure = createAction(
    '[Profile Page] Get Profile Failure',
    props<{error:string}>()
)
export const updateProfil = createAction(
    '[Profile Page] Update Profil',
    props<{user:UserModel}>()
)
export const updateProfilSuccess = createAction(
    '[Profil Page] Update Profil Success',
    props<{user:UserModel}>()
)
export const updateProfilFailure = createAction(
    '[Profil Page] Update Profil Failure',
    props<{error:string}>()
)