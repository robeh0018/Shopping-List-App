import {ActionReducerMap} from "@ngrx/store";

import * as auth from '../auth/store/auth.reducer';
import * as shoppingList from '../shopping-list/store/shopping-list.reducer';
import * as recipe from "../recipes/store/recipe.reducer";


export interface AppState {
  shoppingList: shoppingList.ShoppingListState;
  auth: auth.AuthState;
  recipe: recipe.RecipeState;
}

export const appReducer: ActionReducerMap<AppState> = {
  shoppingList: shoppingList.shoppingListReducer,
  auth: auth.authReducer,
  recipe: recipe.recipeReducer,
};
