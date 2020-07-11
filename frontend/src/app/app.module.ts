import { BrowserModule } from "@angular/platform-browser";
import { NgModule, LOCALE_ID } from "@angular/core";
import { FormsModule, NgForm } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { MaterialModule } from "./material/material.module";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgxPaginationModule } from "ngx-pagination";
import { AngularEditorModule } from "@kolkov/angular-editor";

import { registerLocaleData } from "@angular/common";
import ptBr from "@angular/common/locales/pt";
registerLocaleData(ptBr);

import { NavbarComponent } from "./ui/navbar/navbar.component";
import { FooterComponent } from "./ui/footer/footer.component";
import { PostCardComponent } from "./home/post/post-card/post-card.component";
import { DestaqueCardComponent } from "./destaque/destaque-card/destaque-card.component";
import { ReviewCardComponent } from "./home/review/review-card/review-card.component";
import { HomeComponent } from "./home/home.component";
import { ReviewNewsComponent } from "./home/review/review-news/review-news.component";
import { DestaqueNewsComponent } from "./destaque/destaque-news/destaque-news.component";
import { DestaqueBignewsComponent } from "./destaque/destaque-bignews/destaque-bignews.component";
import { PostagemComponent } from "./postagem/postagem.component";
import { PostagemCardComponent } from "./postagem/postagem-card/postagem-card.component";
import { PostagemContentComponent } from "./postagem/postagem-content/postagem-content.component";
import { TagsCardComponent } from "./tags/tags-card/tags-card.component";
import { TagsComponent } from "./tags/tags.component";
import { SearchComponent } from "./search/search.component";
import { CreateCardComponent } from "./postcreate/create-card/create-card.component";
import { CreateFormComponent } from "./postcreate/create-form/create-form.component";
import { BannerComponent } from "./banner/banner.component";
import { DropdownCategoriasComponent } from "./ui/navbar/dropdown-categorias/dropdown-categorias.component";
import { PostlistComponent } from "./postlist/postlist.component";
import { Error404CardComponent } from "./error404/error404-card/error404-card.component";
import { Error404ContentComponent } from "./error404/error404-content/error404-content.component";
import { ComentarioCardComponent } from "./postagem/comentario/comentario-card/comentario-card.component";
import { ComentarioContentComponent } from "./postagem/comentario/comentario-content/comentario-content.component";
import { ComentarioFormComponent } from "./postagem/comentario/comentario-form/comentario-form.component";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    PostCardComponent,
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
    TagsComponent,
    SearchComponent,
    CreateCardComponent,
    CreateFormComponent,
    BannerComponent,
    DropdownCategoriasComponent,
    PostlistComponent,
    Error404CardComponent,
    Error404ContentComponent,
    ComentarioCardComponent,
    ComentarioContentComponent,
    ComentarioFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    AngularEditorModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: "pt" },
    { provide: NgForm, useValue: "ngForm" },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
