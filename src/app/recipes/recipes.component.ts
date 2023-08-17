import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState} from "../store/appReducer";
import {map} from "rxjs/operators";
import {selectRecipe} from "./store/recipe.selectors";
import {Observable} from "rxjs";
@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  isLoading$: Observable<boolean>;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.isLoading$ = this.store.select(selectRecipe).pipe(
      map((recipeState) => recipeState.isLoading )
    );
  }

}
