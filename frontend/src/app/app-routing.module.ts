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
import { AdminGuard } from "./guards/admin.guard";
import { LoggedGuard } from "./guards/logged.guard";
import { OwnerGuard } from "./guards/owner.guard";
import { DisconnectedGuard } from "./guards/disconnected.guard";

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
    canActivate: [AdminGuard, LoggedGuard]
  },
  {
    path: "editar/:id",
    component: CreateCardComponent,
    canActivate: [OwnerGuard, AdminGuard, LoggedGuard]
  },
  {
    path: "auth",
    component: AuthComponent,
    canActivate: [DisconnectedGuard]
  },
  {
    path: "sign-up",
    component: SignUpFormComponent,
    canActivate: [DisconnectedGuard]
  },
  {
    path: "adm-sign-up",
    component: SignUpFormComponent,
    canActivate: [AdminGuard]
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
