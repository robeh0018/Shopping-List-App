import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import {Store} from "@ngrx/store";
import {Ingredient} from "../../shared/ingredients.model";
import {addIngredient, deleteIngredient, stopEdit, updateIngredient} from "../store/shopping-list.actions";
import {selectShoppingList} from "../store/shopping-list.selectors";
import {AppState} from "../../store/appReducer";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy{
  shoppingForm: FormGroup;
  editMode: boolean;
  ingredientIndex: number;
  storeSubscription: Subscription;


  constructor(private store: Store<AppState>) {
    this.editMode = false;
  };

  ngOnInit() {
    this.storeSubscription = this.store.select(selectShoppingList).subscribe( stateData => {

      const { editedIngredientIndex, editedIngredient } = stateData;
      if ( editedIngredientIndex > -1 ) {

        this.editMode = true;
        this.ingredientIndex = editedIngredientIndex;

        this.shoppingForm.patchValue({
          name: editedIngredient.name,
          amount: editedIngredient.amount,
        });
      } else {
        this.editMode = false;
      }

    })

    this.shoppingForm = new FormGroup({
      'name': new FormControl(null, Validators.required ),
      'amount': new FormControl(1, [Validators.required, Validators.min(1)]),
      });

    // this.ingredientSubscription = this.shoppingListService.ingredientSelected
    //   .subscribe( (ingredientId) => {
    //     if (ingredientId === null ) return;
    //
    //     this.editMode = true;
    //     this.ingredientIndex = ingredientId;
    //
    //     const ingredient = this.shoppingListService.getIngredient(ingredientId);
    //
    //     this.shoppingForm.patchValue({
    //       name: ingredient.name,
    //       amount: ingredient.amount,
    //     });
    //
    //   });

  };

  onSubmit() {
    const { name, amount  } = this.shoppingForm.value;
    const newIngredient = new Ingredient( name, amount );

    if ( this.editMode === false ) {

      // this.shoppingListService.addIngredient(name, amount);
      this.store.dispatch(addIngredient({ payload: newIngredient } ));

    } else {

      this.store.dispatch( updateIngredient({ payload : newIngredient }));
      // this.shoppingListService.updateIngredient( this.ingredientIndex, name, amount );

    }

    this.onClear();
  };

  onDelete() {
    this.store.dispatch( deleteIngredient() );
      // this.shoppingListService.deleteIngredient(this.ingredientIndex);
      this.onClear();
  };

  onClear() {
    this.editMode = false;
    this.shoppingForm.reset();
    //this.shoppingListService.ingredientSelected.next(null);
    this.store.dispatch(stopEdit());
  }

  ngOnDestroy() {
    this.storeSubscription.unsubscribe();
    this.store.dispatch(stopEdit());
  }

}
