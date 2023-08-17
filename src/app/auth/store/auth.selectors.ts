import {createSelector} from "@ngrx/store";

import {AppState} from "../../store/appReducer";

export const selectAuth = ( state: AppState ) => state.auth;


export const selectAuthUser = createSelector(
  selectAuth,
  ( state ) => state.user,
);
