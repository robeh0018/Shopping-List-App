import {Directive, ViewContainerRef} from "@angular/core";

@Directive({
  selector: '[appPlaceholder]'
})

export class Placeholder {
  constructor( viewContainerRef: ViewContainerRef ) {
    
  }
}
