import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {Actions, ofType} from "@ngrx/effects";
import {map, take} from "rxjs/operators";
import {Recipe} from "../recipes/recipe.model";
import {AppState} from "../store/appReducer";
import {fetchRecipes, setRecipes} from "../recipes/store/recipe.actions";
import {selectRecipeRecipes} from "../recipes/store/recipe.selectors";

@Injectable({providedIn: 'root'})

export class RecipesResolverService implements Resolve<Recipe[]> {
  constructor(private store: Store<AppState>, private actions$: Actions) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Recipe[]> | Promise<Recipe[]> | Recipe[] {

    return this.store.select(selectRecipeRecipes).pipe(
      map(recipes => {
        if (recipes.length === 0) {

          this.store.dispatch(fetchRecipes());
          return this.actions$.pipe(
            take(1),
            ofType(setRecipes),
          );

        }

        return recipes;
      })

    )



  };
}
