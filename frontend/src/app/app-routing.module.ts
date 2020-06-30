import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { PostagemComponent } from "./postagem/postagem.component";
import { TagsComponent } from "./tags/tags.component";

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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
