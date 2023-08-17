import {createSelector} from "@ngrx/store";

export const selectRecipe = ( state ) => state.recipe;

export const selectRecipeRecipes = createSelector(
  selectRecipe,
  ( state ) => state.recipes,
);
