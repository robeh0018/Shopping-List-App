import {createReducer, on} from "@ngrx/store";

import {
  authenticateSuccess,
  authenticateFail,
  loginStart,
  logout,
  signupStart,
  clearError,
} from "./auth.actions";
import {User} from "../user.model";

export interface AuthState {
  user: User;
  authError: string;
  loading: boolean;
}

const initialState: AuthState = {
  user: null,
  authError: null,
  loading: false,
}

export const authReducer = createReducer(
  initialState,

  on(authenticateSuccess, (state, {payload}) => {

    const {email, userId, token, expirationDate} = payload;
    const user = new User(email, userId, token, new Date(expirationDate));
    return {
      ...state,
      authError: null,
      user,
      loading: false,
    };
  }),

  on(logout, (state) => {
    return {
      ...state,
      user: null,
    };
  }),

  on(loginStart, signupStart, (state) => {
    return {
      ...state,
      authError: null,
      loading: true,
    };
  }),

  on(authenticateFail, (state, {payload}) => {

    return {
      ...state,
      user: null,
      authError: payload,
      loading: false,
    };
  }),

  on(clearError, (state) => {

    return {
      ...state,
      authError: null,
    };
  })
);
