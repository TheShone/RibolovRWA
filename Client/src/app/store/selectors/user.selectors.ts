import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserState } from "../types/user.interface";

export const selectUserState = (state: UserState) => state;

export const selectorLoading = createSelector(
    selectUserState,
    (state:UserState)=>state.isLoading
);
export const selectorLoggedin = createSelector(
    selectUserState,
    (state:UserState)=>state.isLoggedIn
);
export const selectorError = createSelector(
    selectUserState,
    (state:UserState)=>state.error
);