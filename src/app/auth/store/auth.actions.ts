import {createAction, props} from "@ngrx/store";

export const loginStart = createAction(
  '[Auth] LOGIN_START',
  props<
    {
      payload: {
        email: string,
        password: string,
      };
    }
  >()
);

export const signupStart = createAction(
  '[Auth] SIGNUP_START',
  props<{
    payload: {
      email: string,
      password: string,
    }
  }>()
);

export const authenticateSuccess = createAction(
  '[Auth] AUTHENTICATE_SUCCESS',
  props<
    {
      payload: {
        email: string,
        userId: string,
        token: string,
        expirationDate: string,
        redirect: boolean,
      }
    }
  >()
);

export const authenticateFail = createAction(
  '[[Auth] AUTHENTICATE_FAIL]',
  props<{ payload: string }>()
);

export const logout = createAction(
  '[Auth] LOGOUT',
);

export const autoLogin = createAction(
  '[Auth] AUTO_LOGIN'
);

export const clearError = createAction(
  '[Auth] CLEAR_ERROR',
)
