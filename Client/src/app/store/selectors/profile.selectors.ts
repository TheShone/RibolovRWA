import { createFeature, createFeatureSelector, createSelector } from "@ngrx/store";
import { ProfilState } from "../types/profil.interface";

export const prfilFeatureSelector = createFeatureSelector<ProfilState>('profil')

export const isLoadingSelector = createSelector(
    prfilFeatureSelector,
    (state:ProfilState)=>state.isLoading
) 
export const profilSelector = createSelector(
    prfilFeatureSelector,
    (state:ProfilState)=>state.profil
) 
export const errorSelector = createSelector(
    prfilFeatureSelector,
    (state:ProfilState)=>state.error
)