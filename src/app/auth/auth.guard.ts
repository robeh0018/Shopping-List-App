import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {map, take} from "rxjs/operators";
import {Store} from "@ngrx/store";
import {AppState} from "../store/appReducer";
import {selectAuth} from "./store/auth.selectors";

@Injectable({providedIn: "root"})

export class AuthGuard implements CanActivate{
  constructor(
    private router: Router,
    private store: Store<AppState>) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.store.select(selectAuth).pipe(
      take(1),
      map( authState => {
        return authState.user;
      }),
      map( user => {
        const isAuth = !!user;
        if (isAuth) {
          return true;
        }
        return this.router.createUrlTree(['/auth']);
      }),

    );

  }
}
