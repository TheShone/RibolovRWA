import { createFeatureSelector, createSelector } from "@ngrx/store";
import { RibolovnoMestoState } from "../types/ribMesto.interface";

export const selectRibMestoFeature = createFeatureSelector<RibolovnoMestoState>('ribMesto');

export const isLoadingSelector = createSelector(
    selectRibMestoFeature,
    (state:RibolovnoMestoState)=>state.isLoading
) 
export const ribolovnoMestoSelector = createSelector(
    selectRibMestoFeature,
    (state:RibolovnoMestoState)=>state.ribolovnoMesto
) 
export const errorSelector = createSelector(
    selectRibMestoFeature,
    (state:RibolovnoMestoState)=>state.error
)