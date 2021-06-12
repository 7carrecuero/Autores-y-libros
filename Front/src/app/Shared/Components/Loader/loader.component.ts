import { Component, Input } from '@angular/core';

@Component({
  selector: 'component-loader',
  templateUrl: './loader.component.html'
})

export class LoaderComponent {

  @Input() show: boolean = false;

  constructor() {

  }

}



