import {Actions, concatLatestFrom, createEffect, ofType} from "@ngrx/effects";
import {fetchOrStoreFail, fetchRecipes, setRecipes, storeRecipes} from "./recipe.actions";
import {of, switchMap, throwError} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {catchError, map} from "rxjs/operators";
import {Recipe} from "../recipe.model";
import {Injectable} from "@angular/core";
import {AppState} from "../../store/appReducer";
import {Store} from "@ngrx/store";
import {selectRecipeRecipes} from "./recipe.selectors";

@Injectable()
export class RecipeEffects {

  fetchEffect$ = createEffect(
    () => this.actions$.pipe(
      ofType(fetchRecipes),
      switchMap(() => {
        return this.http.get<Recipe[]>(
          'https://ng-course-recipe-book-94bdd-default-rtdb.firebaseio.com/recipes.json',
        ).pipe(
          map(recipes => {
            return setRecipes({payload: recipes});
          }),
          catchError(() => {
            return of(fetchOrStoreFail());
          }),
        )
      })
    )
  );

  storeEffect$ = createEffect(
    () => this.actions$.pipe(
      ofType(storeRecipes),
      concatLatestFrom(() => this.store.select(selectRecipeRecipes)),
      switchMap(([ , recipes]) => {
        return this.http.put<Recipe[]>(
          'https://ng-course-recipe-book-94bdd-default-rtdb.firebaseio.com/recipes.json',
          recipes)
      }),
      catchError( err => throwError( () => new Error(err) )),
    ), { dispatch: false },
  );

  constructor(private actions$: Actions,
              private http: HttpClient,
              private store: Store<AppState>) {
  }

}
