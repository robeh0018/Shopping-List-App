import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {AlertComponent} from "./alert/alert.component";
import {LoadingSpinnerComponent} from "./loading-spinner/loading-spinner.component";
import {PlaceholderDirective} from "./placeholder.directive";
import {DropdownDirective} from "./dropdown.directive";

// This module is only for declarations,
// and modules or something else, to use them in all our app,
// Needs to be imported in all app module.

@NgModule({
  declarations: [
    AlertComponent,
    LoadingSpinnerComponent,
    PlaceholderDirective,
    DropdownDirective,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AlertComponent,
    LoadingSpinnerComponent,
    PlaceholderDirective,
    DropdownDirective,
    CommonModule,
  ]
})

export class SharedModule {

}
