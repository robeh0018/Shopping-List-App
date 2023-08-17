import {Directive, ElementRef, HostBinding, HostListener} from "@angular/core";

@Directive({
  selector: '[appDropdown]'
})

export class DropdownDirective {
  @HostBinding('class.open') isOpen: boolean;

  constructor( private elRef: ElementRef ) {
    this.isOpen = false;
  }

  @HostListener('document: click', ['$event']) toggleOpen( eventData: Event ) {
    this.isOpen = this.elRef.nativeElement.contains( eventData.target ) ? !this.isOpen : false;
  };

}
