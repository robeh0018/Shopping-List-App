import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";

import {logout} from "../auth/store/auth.actions";
import {AppState} from "../store/appReducer";


export interface AuthResponseData {
  kind: string;
  email: string;
  idToken: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({providedIn: 'root'})

export class AuthService {
  private tokenExpirationTimer: any;


  constructor(private store: Store<AppState>) {
  }

  setLogoutTimer(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.store.dispatch(logout());
    }, expirationDuration);
  };

  clearLogoutTimer() {
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
      this.tokenExpirationTimer = null;
    }
  };

}
