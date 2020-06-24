import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  template: `
    <app-navbar></app-navbar>
    <div id="container">
      <div class="bannerLogo"><img src="assets/img/bannerLogo.png" /></div>
      <router-outlet>
        <mat-card>
          <app-post-card></app-post-card>
          <app-post-news></app-post-news>
        </mat-card>
      </router-outlet>
    </div>
    <div id="content-wrap">
      <app-footer></app-footer>
    </div>
  `,
  styles: [],
})
export class AppComponent {}
