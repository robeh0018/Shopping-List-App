import {Component, OnDestroy, OnInit} from "@angular/core";
import { Subscription} from "rxjs";
import {Store} from "@ngrx/store";

import {selectAuthUser} from "../auth/store/auth.selectors";
import {logout} from "../auth/store/auth.actions";
import {fetchRecipes, storeRecipes} from "../recipes/store/recipe.actions";
import {AppState} from "../store/appReducer";

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
})

export class HeaderComponent implements OnInit, OnDestroy{
  collapsed: boolean;
  isAuthenticated: boolean
  private userSub: Subscription;

  constructor(
    private store: Store<AppState>
    ) {
    this.collapsed = true;
    this.isAuthenticated = false;
  };

  ngOnInit() {
    this.userSub = this.store.select(selectAuthUser)
      .subscribe(
      user => {
      this.isAuthenticated = !!user;
    });
  };

  onSaveData() {
    this.store.dispatch(storeRecipes());
  };

  onFetchData() {
    this.store.dispatch(fetchRecipes());
  };

  onLogout() {
    this.store.dispatch(logout());
  };

  ngOnDestroy() {
    this.userSub.unsubscribe();
  };

}
