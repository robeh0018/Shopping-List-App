import {Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {AlertComponent} from "../shared/alert/alert.component";
import {PlaceholderDirective} from "../shared/placeholder.directive";
import {Store} from "@ngrx/store";
import {AppState} from "../store/appReducer";
import {selectAuth} from "./store/auth.selectors";
import {clearError, loginStart, signupStart} from "./store/auth.actions";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy{
  authForm: FormGroup;
  isLoginMode: boolean;
  isLoading: boolean;
  error: string;
  @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;

  private closeSub: Subscription;
  private storeSub: Subscription;

  constructor(
    private store: Store<AppState>,
    private componentFactoryResolver: ComponentFactoryResolver) {
    this.isLoginMode = true;
    this.isLoading = false;
    this.error = null;
  };

  ngOnInit() {

    this.authForm = new FormGroup<{ [key: string]: FormControl }>({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl( null, [Validators.required, Validators.minLength(6)] ),
      });


    this.storeSub = this.store.select(selectAuth).subscribe( authState => {
      this.isLoading = authState.loading;
      this.error = authState.authError;

      if ( this.error ) {
        this.showErrorAlert( this.error );
      }

    })

  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
    this.error = null;
  };

  onSubmit() {
    if( this.authForm.invalid ) return;

    const { email, password } = this.authForm.value;

    this.isLoading = true;

    if ( this.isLoginMode ) {
      this.store.dispatch(loginStart({payload: { email, password }}));
    } else {
      this.store.dispatch(signupStart({payload: { email, password }}));
    }

    this.authForm.reset();
  };

  // Dynamic Components, Preferible to use ngIf every time ;)
  private showErrorAlert( message: string) {
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);

    const hostViewContainerRef = this.alertHost.viewContainerRef;

    hostViewContainerRef.clear();

    const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);

    componentRef.instance.message = message;
    this.closeSub = componentRef.instance.close.subscribe( () => {
      this.store.dispatch(clearError());
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    });
  };

  ngOnDestroy() {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
    this.storeSub.unsubscribe();
  }

}
