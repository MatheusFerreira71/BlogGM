import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { PostagemComponent } from "./postagem/postagem.component";
import { TagsComponent } from "./tags/tags.component";
import { SearchComponent } from "./search/search.component";
import { CreateCardComponent } from "./postcreate/create-card/create-card.component";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
  },
  {
    path: "post",
    component: PostagemComponent,
  },
  {
    path: "tags",
    component: TagsComponent,
  },
  {
    path: "busca/nome",
    component: SearchComponent,
  },
  {
    path: "postar",
    component: CreateCardComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
