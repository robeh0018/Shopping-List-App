import {createAction, props} from "@ngrx/store";

import {Ingredient} from "../../shared/ingredients.model";


export const addIngredient = createAction(
  '[Shopping-list] ADD_INGREDIENT',
  props<
    {
      payload: Ingredient
    }>()
);

export const addIngredients = createAction(
  '[Shopping-list] ADD_INGREDIENTS',
  props<
    {
      payload: Ingredient[]
    }>()
);

export const updateIngredient = createAction(
  '[Shopping-list] UPDATE_INGREDIENTS',
    props<
      {
        payload: Ingredient
      }>()
);

export const deleteIngredient = createAction(
  '[Shopping-list] DELETE_INGREDIENTS',
);

export const startEdit = createAction(
  '[Shopping-list] START_EDIT',
  props<
    {
      payload: number,
    }
    >()
);

export const stopEdit = createAction(
  '[Shopping-list] STOP_EDIT',
);


