import { createFeatureSelector, createSelector } from '@ngrx/store';
import { KomentariState } from '../types/komentari.interface';
import { adapter } from '../reducers/komentari.reducers';

export const selectKomentariFeature =
  createFeatureSelector<KomentariState>('komentari');

export const isLoadingSelectorr = createSelector(
  selectKomentariFeature,
  (state: KomentariState) => state.isLoadingg
);
export const selectKomentare = createSelector(
  selectKomentariFeature,
  adapter.getSelectors().selectAll
);
export const selectErrorr = createSelector(
  selectKomentariFeature,
  (state: KomentariState) => state.errorr
);
