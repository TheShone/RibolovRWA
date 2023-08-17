import { EntityAdapter, createEntityAdapter } from "@ngrx/entity"
import { UserModel } from "../types/user.module"
import { UserState } from "../types/user.interface";
import { createReducer, on } from "@ngrx/store";
import * as userActions from '../actions/user.actions'

export const adapter:EntityAdapter<UserModel>=createEntityAdapter<UserModel>();

export const initialState:UserState=adapter.getInitialState({
    isLoading:false,
    isLoggedIn: false,
    error:null,
}) 

export const reducers=createReducer(initialState,
    on(userActions.loginUser,(state)=>({...state,isLoading:true})),
    on(userActions.loginUserSuccess,userActions.browserRolead,(state)=>({...state ,isLoading:false,isLoggedIn:true})),
    on(userActions.loginUserFailure,(state,action)=>({...state ,isLoading:false,isLoggedIn:false,error:action.error})),
    on(userActions.logOutUser,(state)=>({...state ,isLoading:true})),
    on(userActions.logOutUserSuccess,(state)=>({...state ,isLoading:false,isLoggedIn:false})),
    on(userActions.logOutUserFailure,(state,action)=>({...state ,isLoading:false,error:action.error})))