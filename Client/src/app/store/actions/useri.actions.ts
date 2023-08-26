import { createAction, props } from "@ngrx/store";
import { UserModel } from "../types/user.module";

export const getUsere = createAction(
    '[Useri Page] Get Usere',
)
export const getUsereSuccess = createAction(
    '[Useri Page] Get Usere Success',
    props<{useri:UserModel[]}>()
)
export const getUsereFailure=createAction(
    '[Useri Page] Get Usere Failure',
    props<{error:string}>()
)
export const deleteUser=createAction(
    '[User Page] Delete User',
    props<{id:number}>()
)
export const deleteUserSuccess=createAction(
    '[User Page] Delete User Success',
    props<{id:number}>()
)
export const deleteUserFailure=createAction(
    '[User Page] Delete User Failure',
    props<{error:string}>()
) 