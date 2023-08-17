import {NgModule} from "@angular/core";
import {HTTP_INTERCEPTORS} from "@angular/common/http";

import {AuthInterceptorService} from "./auth/auth.interceptor.service";

// Provide services here.
// Is better provide services in their task ex: @Injectable({ provideIn: 'root'}).

@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ]
})

export class CoreModule {

}
