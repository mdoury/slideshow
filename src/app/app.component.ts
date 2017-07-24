import { Component } from '@angular/core';

@Component({
  selector: 'slide-root',
  template: `
  <h1>
    {{title}}
  </h1>
  <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent {
  title = 'slide works!';
}
