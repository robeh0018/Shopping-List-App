import {createReducer, on} from "@ngrx/store";

import {
  addIngredient,
  addIngredients,
  deleteIngredient,
  startEdit,
  stopEdit,
  updateIngredient
} from "./shopping-list.actions";

import {Ingredient} from "../../shared/ingredients.model";


export interface ShoppingListState {
  ingredients: Ingredient[];
  editedIngredient: Ingredient,
  editedIngredientIndex: number,
}

const initialState: ShoppingListState = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 3),
  ],
  editedIngredient: null,
  editedIngredientIndex: -1,
};

export const shoppingListReducer = createReducer(
  initialState,

  on( addIngredient, ( state, action ) => {
    return {
      ...state,
      ingredients: [ ...state.ingredients, action.payload ],
  }
  }),

  on( addIngredients, (state, action  ) => {
    return {
      ...state,
      ingredients: [ ...state.ingredients, ...action.payload ],
    }
  }),

  on( updateIngredient, ( state, action ) => {

    const ingredient = state.ingredients[state.editedIngredientIndex];
    const updatedIngredient = {
      ...ingredient,
      ...action.payload,
    };

    const updatedIngredients = [...state.ingredients];
    updatedIngredients[state.editedIngredientIndex] = updatedIngredient;

    return {
      ...state,
      ingredients: updatedIngredients,
      editedIngredient: null,
      editedIngredientIndex: -1
    }
  }),

  on(deleteIngredient, ( state ) => {
    const updatedIngredients  = state.ingredients.filter(
      (ingredient, index ) => index !== state.editedIngredientIndex );

    return {
      ...state,
      ingredients: updatedIngredients,
      editedIngredient: null,
      editedIngredientIndex: -1
    };
  }),

  on(startEdit, ( state, action ) => {

    return {
      ...state,
      editedIngredient: { ...state.ingredients[action.payload] },
      editedIngredientIndex: action.payload,
    }
  }),

  on( stopEdit, (state) => {
    return {
      ...state,
      editedIngredient: null,
      editedIngredientIndex: -1
    };
  }),

)
