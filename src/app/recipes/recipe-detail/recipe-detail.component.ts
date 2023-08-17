import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {Subscription} from "rxjs";

import {Recipe} from "../recipe.model";
import {AppState} from "../../store/appReducer";
import {deleteRecipe, getRecipe} from "../store/recipe.actions";
import {selectRecipe} from "../store/recipe.selectors";
import {addIngredients} from "../../shopping-list/store/shopping-list.actions";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  recipe: Recipe;
  id: number;
  storeSubscription: Subscription;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private store: Store<AppState>
  ) {
    this.recipe = new Recipe('', '', '', []);
  };

  ngOnInit() {
    this.route.params
      .subscribe((params: Params) => {
          this.id = +params['recipeId'];
          this.store.dispatch(getRecipe({payload: this.id}));
        }
      );

    this.storeSubscription = this.store.select(selectRecipe)
      .subscribe((recipeState) => {
        this.recipe = recipeState.activatedRecipe;
      });
  }

  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onAddToShopping() {
    this.store.dispatch(addIngredients({payload: this.recipe.ingredients}));
  };

  onDeleteRecipe() {
    this.store.dispatch(deleteRecipe({payload: this.id}))
    this.router.navigate(['../'], {relativeTo: this.route});
  };

  ngOnDestroy() {
    this.storeSubscription.unsubscribe();
  }

}
