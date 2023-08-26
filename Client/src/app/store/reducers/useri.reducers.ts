import { EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import { UserModel } from "../types/user.module";
import { createReducer, on } from "@ngrx/store";
import * as UseriActions from '../actions/useri.actions'
import { UseriState } from "../types/useri.interface";
export const adapter: EntityAdapter<UserModel>= createEntityAdapter<UserModel>();
export const initialState: UseriState = adapter.getInitialState({
    isLoading:false,
    error:null
})

export const reducers7 = createReducer(initialState,
    on(UseriActions.getUsere,(state)=>({...state,isLoading:true})),
    on(UseriActions.getUsereSuccess,(state,action)=>{
        return adapter.addMany(action.useri,{...state,isLoading:false})
    }),
    on(UseriActions.getUsereFailure,(state,action)=>({...state,error:action.error})),
    on(UseriActions.deleteUser,(state)=>({...state,isLoading:true})),
    on(UseriActions.deleteUserSuccess,(state,action)=>{
        return adapter.removeOne(action.id,{...state,isLoading:false})
    })
    
)