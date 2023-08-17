import {NgModule} from "@angular/core";
import {AuthComponent} from "./auth.component";
import {ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../shared/shared.module";
import {AuthRoutingModule} from "./auth-routing.module";


@NgModule({
  declarations: [
    AuthComponent,
  ],
  imports: [
    ReactiveFormsModule,
    AuthRoutingModule,
    SharedModule,
  ],
})

export class AuthModule {

}
