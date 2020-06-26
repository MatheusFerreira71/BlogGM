import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  // template: `
  //   <app-navbar></app-navbar>
  //   <router-outlet>
  //     <app-home></app-home>
  //   </router-outlet>
  //   <div id="content-wrap">
  //     <app-footer></app-footer>
  //   </div>
  // `,
  template: `
    <app-navbar></app-navbar>
    <app-home></app-home>
    <app-footer></app-footer>
  `,
  styles: [],
})
export class AppComponent {}
