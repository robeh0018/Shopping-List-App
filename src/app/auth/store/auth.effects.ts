import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {authenticateSuccess, autoLogin, loginStart, logout, signupStart} from "./auth.actions";
import {catchError, map, switchMap, tap} from "rxjs/operators";

import {AuthResponseData, AuthService} from "../../services/authService";
import {environment} from "../../../environments/environment";
import {Router} from "@angular/router";
import {handleAuthentication} from "../helpers/handleAuthentication";
import {handleError} from "../helpers/handleError";
import {User} from "../user.model";

@Injectable()

export class AuthEffects {

  authSignup$ = createEffect(
    () => this.actions$.pipe(
      ofType(signupStart),
      switchMap(authData => {
        return this.http.post<AuthResponseData>(
          `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseAPIKey}`,
          {

            email: authData.payload.email,
            password: authData.payload.password,
            returnSecureToken: true
          },
        ).pipe(
          map(resData => {
            this.authService.setLogoutTimer(+resData.expiresIn * 1000);
            return handleAuthentication(resData);
          }),

          catchError(errorRes => {
            return handleError(errorRes);
          })
        )
      })
    )
  )

  authLogin$ = createEffect(
    () => this.actions$.pipe(
      ofType(loginStart),
      switchMap((authData) => {
        return this.http.post<AuthResponseData>(
          `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseAPIKey}`,
          {
            email: authData.payload.email,
            password: authData.payload.password,
            returnSecureToken: true
          },
        ).pipe(
          map(resData => {
            this.authService.setLogoutTimer(+resData.expiresIn * 1000);
            return handleAuthentication(resData);
          }),
          catchError(errorRes => {
            return handleError(errorRes);
          }),
        );

      }),
    )
  );

  authRedirect$ = createEffect(
    () => this.actions$.pipe(
      ofType(authenticateSuccess),
      tap(( authData ) => {
        if (authData.payload.redirect) {
          this.router.navigate(['/']);
        }
      })
    ), {dispatch: false}
  );

  authAutoLogin$ = createEffect(
    () => this.actions$.pipe(
      ofType(autoLogin),
      map(() => {
        const userData = JSON.parse(localStorage.getItem('userData'));

        if (!userData) return {type: 'EMPTY'};

        const {email, id, _token, _tokenExpirationDate} = userData;

        const loadedUser = new User(email, id, _token, _tokenExpirationDate);

        if (!loadedUser.token) return {type: 'EMPTY'};

        const expirationDuration = new Date(_tokenExpirationDate).getTime() - new Date().getTime();

        this.authService.setLogoutTimer(expirationDuration);

        return authenticateSuccess({
          payload: {
            email,
            userId: id,
            token: _token,
            expirationDate: _tokenExpirationDate,
            redirect: false,
          }
        });

      })
    )
  );

  authLogout$ = createEffect(
    () => this.actions$.pipe(
      ofType(logout),
      tap(() => {
        this.authService.clearLogoutTimer();
        localStorage.removeItem('userData');
        this.router.navigate(['auth']);
      }),
    ), {dispatch: false}
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
  ) {
  };
}
