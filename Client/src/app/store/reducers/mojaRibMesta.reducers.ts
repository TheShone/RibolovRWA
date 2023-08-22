import { EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import { RibolovnoMestoModel } from "../types/ribolovnoMesto.module";
import { RibolovnaMestaState } from "../types/ribolovnaMesta.interface";
import { createReducer, on } from "@ngrx/store";
import * as MojaRibolovnaMestaActions from '../actions/mojaRibMesta.actions'
export const adapter:EntityAdapter<RibolovnoMestoModel>=createEntityAdapter<RibolovnoMestoModel>()

export const initialState:RibolovnaMestaState=adapter.getInitialState({
    isLoading:false,
    error:null
})

export const reducers5 = createReducer(initialState,
    on(MojaRibolovnaMestaActions.getMojaRibolovnaMesta,(state)=>({...state,isLoading:true})),
    on(MojaRibolovnaMestaActions.getMojaRibolovnaMestaSuccess,(state,actions)=>{
        return adapter.addMany(actions.ribMesta,{...state,isLoading:false})
    }),
    on(MojaRibolovnaMestaActions.getMojaRibolovnaMestaFailute,(state,actions)=>({...state,error:actions.error})),
    on(MojaRibolovnaMestaActions.addRibolovnoMestoSuccess,(state,action)=>{
        return adapter.addOne(action.ribMesto,{...state, isLoading:false})
    })
    )