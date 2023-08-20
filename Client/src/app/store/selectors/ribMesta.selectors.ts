import { adapter } from '../reducers/ribMesta.reducers';
import { RibolovnaMestaState } from './../types/ribolovnaMesta.interface';
import { createFeatureSelector, createSelector } from "@ngrx/store";

export const selectRibMestaFeature = createFeatureSelector<RibolovnaMestaState>('ribMesta');
export const selectorLoading = createSelector(
    selectRibMestaFeature,
    (state:RibolovnaMestaState)=>state.isLoading
);
export const selectorRibMesta = createSelector(
    selectRibMestaFeature,
    adapter.getSelectors().selectAll
);
export const selectorError = createSelector(
    selectRibMestaFeature,
    (state:RibolovnaMestaState)=>state.error
);