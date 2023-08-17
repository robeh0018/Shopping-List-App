import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import { Ingredient } from "../shared/ingredients.model";
import {Store} from "@ngrx/store";
import {selectShoppingList} from "./store/shopping-list.selectors";
import {startEdit} from "./store/shopping-list.actions";
import {AppState} from "../store/appReducer";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy{
  ingredients: Ingredient[];
  activeItem: number;

  storeSubscription: Subscription;

  constructor(private store: Store<AppState>) {
    this.activeItem = null;
  };

  ngOnInit() {
    this.storeSubscription = this.store.select(selectShoppingList).subscribe(stateData => {
      this.ingredients = stateData.ingredients;
      this.activeItem = stateData.editedIngredientIndex;
    });
  };

  onSelect( id: number ) {
    this.store.dispatch(startEdit({payload: id}));
  };

  ngOnDestroy() {
    this.storeSubscription.unsubscribe();
  }

}
