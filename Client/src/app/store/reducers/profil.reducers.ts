import { EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import { UserModel } from "../types/user.module";
import { createReducer, on } from "@ngrx/store";
import * as ProfilActions from '../actions/profil.actions'
import { ProfilState } from "../types/profil.interface";
export const adapter:EntityAdapter<UserModel> = createEntityAdapter<UserModel>()

export const initialState: ProfilState = adapter.getInitialState({
    isLoading:false,
    profil:null,
    error:null
})

export const reducers6 = createReducer(initialState,
    on(ProfilActions.getProfil,(state)=>({...state,isLoading:true})),
    on(ProfilActions.getProfilSuccess,(state,action)=>({...state,isLoading:false, profil:action.profile})),
    on(ProfilActions.getProfileFailure,(state,action)=>({...state,error: action.error})),
    on(ProfilActions.updateProfil,(state)=>({...state,isLoading:true})),
    on(ProfilActions.updateProfilSuccess,(state,action)=>({...state,isLoading:false,profil: action.user})),
    on(ProfilActions.updateProfilFailure,(state,action)=>({...state,error:action.error}))
);