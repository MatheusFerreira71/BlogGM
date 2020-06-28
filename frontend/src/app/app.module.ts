import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule } from "./material/material.module";
import { NavbarComponent } from "./ui/navbar/navbar.component";
import { FooterComponent } from "./ui/footer/footer.component";
import { PostCardComponent } from "./home/post/post-card/post-card.component";
import { PostNewsComponent } from "./home/post/post-news/post-news.component";
import { HttpClientModule } from "@angular/common/http";
import { DestaqueCardComponent } from "./destaque/destaque-card/destaque-card.component";
import { ReviewCardComponent } from "./home/review/review-card/review-card.component";
import { HomeComponent } from "./home/home.component";
import { ReviewNewsComponent } from "./home/review/review-news/review-news.component";
import { DestaqueNewsComponent } from "./destaque/destaque-news/destaque-news.component";
import { DestaqueBignewsComponent } from "./destaque/destaque-bignews/destaque-bignews.component";
import { NgxPaginationModule } from "ngx-pagination";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    PostCardComponent,
    PostNewsComponent,
    DestaqueCardComponent,
    ReviewCardComponent,
    HomeComponent,
    ReviewNewsComponent,
    DestaqueNewsComponent,
    DestaqueBignewsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
