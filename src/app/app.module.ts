import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from "@ngrx/store-devtools";

import { CoreModule } from "./core.module";
import { SharedModule } from "./shared/shared.module";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from './app.component';
import{ HeaderComponent } from "./header/header.component";
import {AuthEffects} from "./auth/store/auth.effects";

import {appReducer} from "./store/appReducer";
import {environment} from "../environments/environment";
import {RecipeEffects} from "./recipes/store/recipe.effects";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot( appReducer ),
    EffectsModule.forRoot([ AuthEffects, RecipeEffects ]),
    StoreDevtoolsModule.instrument({logOnly: environment.production}),
    SharedModule,
    CoreModule,
    StoreRouterConnectingModule.forRoot(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
