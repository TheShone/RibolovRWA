import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserModel } from "../types/user.module";
import { UseriState } from "../types/useri.interface";
import { adapter } from "../reducers/useri.reducers";

export const SelectUsereFeature = createFeatureSelector<UseriState>('useri')


export const isLoadingselector = createSelector(
    SelectUsereFeature,
    (state:UseriState)=>state.isLoading
)
export const useriSelector = createSelector(
    SelectUsereFeature,
    adapter.getSelectors().selectAll
)
export const selectError = createSelector(
    SelectUsereFeature,
    (state:UseriState)=>state.error
)