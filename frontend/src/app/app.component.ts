import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  template: `
    <app-navbar></app-navbar>
    <div id="container">
      <div class="bannerLogo"><img src="assets/img/bannerLogo.png" /></div>
      <router-outlet>
        <app-post-card></app-post-card>
      </router-outlet>
    </div>
    <div id="content-wrap">
      <app-footer></app-footer>
    </div>
  `,
  styles: [],
})
export class AppComponent {}
