import {NgModule } from "@angular/core";
import { RouterModule, Routes} from "@angular/router";

import {RecipesComponent} from "./recipes.component";
import {RecipeNoSelectedComponent} from "./recipe-no-selected/recipe-no-selected.component";
import {RecipeEditComponent} from "./recipe-edit/recipe-edit.component";
import {RecipeDetailComponent} from "./recipe-detail/recipe-detail.component";
import {RecipesResolverService} from "../services/recipes-resolver.service";
import {AuthGuard} from "../auth/auth.guard";


const routes: Routes = [
  { path: '', component: RecipesComponent, canActivate: [AuthGuard],
    children: [
      { path: '', component: RecipeNoSelectedComponent },
      { path: 'new', component: RecipeEditComponent },
      {
        path: ':recipeId',
        component: RecipeDetailComponent,
        resolve: [RecipesResolverService]
      },
      {
        path: ':recipeId/edit',
        component: RecipeEditComponent,
        resolve: [RecipesResolverService]
      }
    ]
  },
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class RecipesRoutingModule {

}
