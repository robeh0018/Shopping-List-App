import {createAction, props} from "@ngrx/store";

import {Ingredient} from "../../shared/ingredients.model";


export const addIngredient = createAction(
  '[Shopping-list] ADD_INGREDIENT',
  props<{ payload: Ingredient }>()
)

export const addIngredients = createAction(
  '[Shopping-list] ADD_INGREDIENTS',
  props<{ payload: Ingredient[] }>()
)
