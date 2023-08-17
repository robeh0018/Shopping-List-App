import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

import {Recipe} from "../recipe.model";
import {Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import {AppState} from "../../store/appReducer";
import {selectRecipeRecipes} from "../store/recipe.selectors";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  storeSubscription: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<AppState>) {
  };

  ngOnInit() {
    this.storeSubscription = this.store.select(selectRecipeRecipes)
      .subscribe(
        (recipes) => {
          this.recipes = recipes;
        },
      )
  }

  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route});
  };

  ngOnDestroy() {
    this.storeSubscription.unsubscribe();
  }
}
