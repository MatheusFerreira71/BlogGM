import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { PostagemComponent } from "./postagem/postagem.component";
import { TagsComponent } from "./tags/tags.component";
import { SearchComponent } from "./search/search.component";
import { CreateCardComponent } from "./postcreate/create-card/create-card.component";
import { Error404CardComponent } from "./error404/error404-card/error404-card.component";
import { AuthComponent } from "./auth/auth.component";
import { SignUpFormComponent } from './sign-up-form/sign-up-form.component'

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
  },
  {
    path: "post/:id",
    component: PostagemComponent,
    runGuardsAndResolvers: "always",
  },
  {
    path: "tags",
    component: TagsComponent,
  },
  {
    path: "busca/:type",
    component: SearchComponent,
    runGuardsAndResolvers: "paramsOrQueryParamsChange",
  },
  {
    path: "postar",
    component: CreateCardComponent,
  },
  {
    path: "editar/:id",
    component: CreateCardComponent,
  },
  {
    path: "auth",
    component: AuthComponent
  },
  {
    path: "sign-up",
    component: SignUpFormComponent
  },
  {
    path: "adm-sign-up",
    component: SignUpFormComponent
  },
  {
    path: "**",
    component: Error404CardComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: "top",
      onSameUrlNavigation: "reload",
      relativeLinkResolution: 'legacy'
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
