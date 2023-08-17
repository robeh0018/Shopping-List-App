import {createAction, props} from "@ngrx/store";
import {Recipe} from "../recipe.model";

export const fetchRecipes = createAction(
  '[Recipes] FetchRecipes'
)

export const storeRecipes = createAction(
  '[Recipes] StoreRecipes'
);

export const fetchOrStoreFail = createAction(
  '[Recipes] FetchOrStoreFail',
)

export const setRecipes = createAction(
  '[Recipes] SetRecipes',
  props<
    {
      payload: Recipe[],
    }
  >()
);

export const getRecipe = createAction(
  '[Recipes] GetRecipe',
  props<{
    payload: number,
  }>()
);

export const addRecipe = createAction(
  '[Recipes] AddRecipe',
  props<{
    payload: Recipe,
  }>()
);

export const updateRecipe = createAction(
  '[Recipes] UpdateRecipe',
  props<{
    payload: {
      id: number,
      recipe: Recipe,
    }
  }>()
);

export const deleteRecipe = createAction(
  '[Recipes] DeleteRecipe',
  props<{
    payload: number,
  }>()
);
