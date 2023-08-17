import {createReducer, on} from "@ngrx/store";

import {addIngredient, addIngredients } from "./shopping-list.actions";

import {Ingredient} from "../../shared/ingredients.model";

export interface ShoppingListProps {
  ingredients: Ingredient[];
}

const initialState: ShoppingListProps = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 3),
  ]
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
  })

)
