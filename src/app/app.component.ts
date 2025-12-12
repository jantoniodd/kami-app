import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  standalone: false,
  selector: 'km-root',
  template: `<router-outlet></router-outlet>`,
  encapsulation: ViewEncapsulation.None
})
export class AppComponent { }
