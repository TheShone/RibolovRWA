import { EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import { RibolovnoMestoModel } from "../types/ribolovnoMesto.module";
import { RibolovnaMestaState } from "../types/ribolovnaMesta.interface";
import { createReducer, on } from "@ngrx/store";
import * as MojaRibolovnaMestaActions from '../actions/mojaRibMesta.actions'
import { MojaRibolovnaMestaState } from "../types/mojaRibMesta.interface";
export const adapter:EntityAdapter<RibolovnoMestoModel>=createEntityAdapter<RibolovnoMestoModel>()

export const initialState:MojaRibolovnaMestaState=adapter.getInitialState({
    isLoading:false,
    error:null,
    update:false
})

export const reducers5 = createReducer(initialState,
    on(MojaRibolovnaMestaActions.getMojaRibolovnaMesta,(state)=>({...state,isLoading:true})),
    on(MojaRibolovnaMestaActions.getMojaRibolovnaMestaSuccess,(state,actions)=>{
        return adapter.addMany(actions.ribMesta,{...state,isLoading:false})
    }),
    on(MojaRibolovnaMestaActions.getMojaRibolovnaMestaFailute,(state,actions)=>({...state,error:actions.error})),
    on(MojaRibolovnaMestaActions.addRibolovnoMesto,(state)=>({...state,isLoading:true})),
    on(MojaRibolovnaMestaActions.addRibolovnoMestoSuccess,(state,action)=>{
        return adapter.addOne(action.ribMesto,{...state, isLoading:false})
    }),
    on(MojaRibolovnaMestaActions.deleteRibolovnoMesto,(state)=>({...state,isLoading:true})),
    on(MojaRibolovnaMestaActions.deleteRibolovnoMestoSuccess,(state,action)=>{
        return adapter.removeOne(action.id,{...state,isLoading:false})
    })
)