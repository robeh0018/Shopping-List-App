import {createReducer, on} from "@ngrx/store";
import {Recipe} from "../recipe.model";
import {
  addRecipe,
  deleteRecipe,
  fetchOrStoreFail, fetchRecipes,
  getRecipe,
  setRecipes,
  updateRecipe
} from "./recipe.actions";


export interface RecipeState {
  recipes: Recipe[],
  activatedRecipe: Recipe,
  fetchOrStoreError: string,
  isLoading: boolean,
}

const initialState: RecipeState = {
  recipes: [],
  activatedRecipe: null,
  fetchOrStoreError: null,
  isLoading: false
}

export const recipeReducer = createReducer(
  initialState,

  on(setRecipes, (state, action) => {

    return {
      ...state,
      recipes: [...action.payload],
      fetchOrStoreError: null,
      isLoading: false,
    };
  }),

  on(getRecipe, (state, {payload}) => {

    const activatedRecipe = state.recipes.filter(
      (recipe, index) => index === payload)[0];

    return {
      ...state,
      activatedRecipe,
    }
  }),

  on(addRecipe, (state, {payload}) => {

    const newRecipe = new Recipe(
      payload.name,
      payload.description,
      payload.imagePath,
      (payload.ingredients) ? payload.ingredients : null,
    );

    const updatedRecipes = [...state.recipes, newRecipe];

    return {
      ...state,
      recipes: updatedRecipes,
    };
  }),

  on(updateRecipe, (state, {payload}) => {

    const updatedRecipes = state.recipes.map((recipe, index) => {

      if (payload.id === index) {
        return payload.recipe;
      }
      return recipe;
    });

    return {
      ...state,
      recipes: updatedRecipes,
    }
  }),

  on(deleteRecipe, (state, {payload}) => {

    const updatedRecipes = state.recipes.filter((recipe, index) => index !== payload);

    return {
      ...state,
      recipes: updatedRecipes,
      activatedRecipe: null,
    }
  }),

  on(fetchRecipes,  (state) => {
    return {
      ...state,
      isLoading: true,
    }
  }),

  on(fetchOrStoreFail, (state) => {
    return {
      ...state,
      recipes: null,
      activatedRecipe: null,
      fetchOrStoreError: 'Unknown error occurred'
    }
  })
);
