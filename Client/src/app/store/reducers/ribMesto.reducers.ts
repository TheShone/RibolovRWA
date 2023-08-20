import { EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import { RibolovnoMestoState } from "../types/ribMesto.interface";
import { RibolovnoMestoModel } from "../types/ribolovnoMesto.module";
import { createReducer, on } from "@ngrx/store";
import * as ribolovnoMestoActions from '../actions/ribMesto.actions'
export const adapter:EntityAdapter<RibolovnoMestoModel>=createEntityAdapter<RibolovnoMestoModel>()

export const initialState: RibolovnoMestoState=adapter.getInitialState({
    isLoading:false,
    ribolovnoMesto: null,
    error: null
})
export const reducers3=createReducer(initialState,
    on(ribolovnoMestoActions.getRibMesto,(state)=>({...state,isLoading:true})),
    on(ribolovnoMestoActions.getRibMestoSuccess,(state,action)=>({...state,isLoading:false,ribolovnoMesto:action.ribMesto})),
    on(ribolovnoMestoActions.getRibMestoFailure,(state,action)=>({...state,error:action.error}))
)