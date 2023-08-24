import { RibolovnaMestaState } from '../types/ribolovnaMesta.interface';
import { EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import { RibolovnoMestoModel } from "../types/ribolovnoMesto.module";
import { createReducer, on } from '@ngrx/store';
import * as ribolovnaMestaActions from '../actions/ribMesta.actions'
import * as RibolovnoMestoAkcije from '../actions/ribMesto.actions'
export const adapter:EntityAdapter<RibolovnoMestoModel>=createEntityAdapter<RibolovnoMestoModel>()

export const initialState:RibolovnaMestaState=adapter.getInitialState({
    isLoading:false,
    error: null,
    update:false
})

export const reducers2=createReducer(initialState,
    on(ribolovnaMestaActions.getRibolovnaMesta,(state)=>({...state,isLoading:true})),
    on(ribolovnaMestaActions.getRibolovnaMestaSuccess,(state,action)=>{
        return adapter.addMany(action.mesta, {...state, isLoading:false})
    }),
    on(ribolovnaMestaActions.getRibolovnaMestaFailure,(state,action)=>({...state,isLoading:false,error:action.error})),
    on(RibolovnoMestoAkcije.updateRibolovnoMesto,(state)=>({...state,isLoading:true})),
    on(RibolovnoMestoAkcije.updateRibolovnoMestoSuccess,(state,actions)=>{
        return adapter.updateOne({id:actions.ribMesto.id,changes:actions.ribMesto},{...state,isLoading:false})
    }),
    on(RibolovnoMestoAkcije.updateRibolovnoMestoFailure,(state,action)=>({...state,error:action.error})),
    
)