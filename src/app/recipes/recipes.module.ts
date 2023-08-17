import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";

import {ReactiveFormsModule} from "@angular/forms";
import {RecipesComponent} from "./recipes.component";
import {RecipeListComponent} from "./recipe-list/recipe-list.component";
import {RecipeDetailComponent} from "./recipe-detail/recipe-detail.component";
import {RecipeItemComponent} from "./recipe-list/recipe-item/recipe-item.component";
import {RecipeNoSelectedComponent} from "./recipe-no-selected/recipe-no-selected.component";
import {RecipeEditComponent} from "./recipe-edit/recipe-edit.component";
import {RecipesRoutingModule} from "./recipes-routing.module";
import {SharedModule} from "../shared/shared.module";

// Declarations also need to be imported.
// They just can be called once in the app.

@NgModule({
  declarations: [
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    RecipeNoSelectedComponent,
    RecipeEditComponent,
  ],
  imports: [
    RouterModule,
    SharedModule,
    ReactiveFormsModule,
    RecipesRoutingModule,
  ]
})

export class RecipesModule {

}
