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
import { PostagemComponent } from "./postagem/postagem.component";
import { PostagemCardComponent } from "./postagem/postagem-card/postagem-card.component";
import { PostagemContentComponent } from "./postagem/postagem-content/postagem-content.component";
import { TagsCardComponent } from "./tags/tags-card/tags-card.component";
import { TagsContentComponent } from "./tags/tags-content/tags-content.component";
import { TagsComponent } from "./tags/tags.component";
import { SearchComponent } from "./search/search.component";
import { SearchContentComponent } from "./search/search-content/search-content.component";
import { CreateCardComponent } from "./postcreate/create-card/create-card.component";
import { CreateFormComponent } from "./postcreate/create-form/create-form.component";
import { AngularEditorModule } from "@kolkov/angular-editor";

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
    PostagemComponent,
    PostagemCardComponent,
    PostagemContentComponent,
    TagsCardComponent,
    TagsContentComponent,
    TagsComponent,
    SearchComponent,
    SearchContentComponent,
    CreateCardComponent,
    CreateFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    AngularEditorModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
