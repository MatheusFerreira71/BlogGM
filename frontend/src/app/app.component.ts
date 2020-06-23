import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  template: `
    <app-navbar></app-navbar>
    <div id="container">
      <router-outlet></router-outlet>
    </div>
    <app-footer></app-footer>
  `,
  styles: [],
})
export class AppComponent {}
