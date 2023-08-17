import {Component} from "@angular/core";

@Component({
  selector: 'loading-spinner',
  styleUrls: ['loading-spinner.component.css'],
  template: '<div class="lds-roller">' +
    '<div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>' +
    '</div>'
})

export class LoadingSpinnerComponent {

  constructor() {
  }
}
