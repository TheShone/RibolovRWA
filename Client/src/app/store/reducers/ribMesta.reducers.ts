import { RibolovnaMestaState } from '../types/ribolovnaMesta.interface';
import { EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import { RibolovnoMestoModel } from "../types/ribolovnoMesto.module";
import { createReducer, on } from '@ngrx/store';
import * as ribolovnaMestaActions from '../actions/ribMesta.actions'
export const adapter:EntityAdapter<RibolovnoMestoModel>=createEntityAdapter<RibolovnoMestoModel>()

export const initialState:RibolovnaMestaState=adapter.getInitialState({
    isLoading:false,
    error: null,
})

export const reducers2=createReducer(initialState,
    on(ribolovnaMestaActions.getRibolovnaMesta,(state)=>({...state,isLoading:true})),
    on(ribolovnaMestaActions.getRibolovnaMestaSuccess,(state,action)=>{
        return adapter.addMany(action.mesta, {...state, isLoading:false})
    }),
    on(ribolovnaMestaActions.getRibolovnaMestaFailure,(state,action)=>({...state,isLoading:false,error:action.error}))
    
)