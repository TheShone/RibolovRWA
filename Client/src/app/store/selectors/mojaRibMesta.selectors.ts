import { adapter } from '../reducers/mojaRibMesta.reducers';
import { MojaRibolovnaMestaState } from './../types/mojaRibMesta.interface';
import { createFeatureSelector, createSelector } from "@ngrx/store";

export const mojaRibMestaFeature = createFeatureSelector<MojaRibolovnaMestaState>('mojaRibMesta')
export const isLoadingSelector = createSelector(
    mojaRibMestaFeature,
    (state:MojaRibolovnaMestaState)=>state.isLoading
)
export const mojaRibMestaSelector = createSelector(
    mojaRibMestaFeature,
    adapter.getSelectors().selectAll
)
export const validRibMestaSelector = createSelector(
    mojaRibMestaSelector,
    (ribMesta) => ribMesta.filter((ribMesto) => ribMesto.id !== 'asd')
  );
export const errorSelector = createSelector(
    mojaRibMestaFeature,
    (state:MojaRibolovnaMestaState)=>state.error
)