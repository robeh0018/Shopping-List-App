import {NgModule} from "@angular/core";
import {ReactiveFormsModule} from "@angular/forms";

import {ShoppingListComponent} from "./shopping-list.component";
import {ShoppingEditComponent} from "./shopping-edit/shopping-edit.component";
import {ShoppingRoutingModule} from "./shopping-routing.module";
import {SharedModule} from "../shared/shared.module";

// Declarations also need to be imported.
// They just can be called once in the app.

@NgModule({
  declarations: [
    ShoppingListComponent,
    ShoppingEditComponent,
  ],
  imports: [
    ReactiveFormsModule,
    ShoppingRoutingModule,
    SharedModule,
  ],
})

export class ShoppingListModule {

}
