import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest} from "@angular/common/http";
import {exhaustMap, Observable} from "rxjs";
import {map, take} from "rxjs/operators";
import {Store} from "@ngrx/store";
import {AppState} from "../store/appReducer";
import {selectAuth} from "./store/auth.selectors";

@Injectable()

export class AuthInterceptorService implements HttpInterceptor {

  constructor(private store: Store<AppState>) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return this.store.select(selectAuth)
      .pipe(
        take(1),
        map(authState => {
          return authState.user;
        }),
        exhaustMap(user => {

          if (!user) {
            return next.handle(req);
          }

          const modifiedReq = req.clone({params: new HttpParams().set('auth', user.token)})
          return next.handle(modifiedReq);
        })
      );

  }

}
