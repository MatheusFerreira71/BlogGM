import { Injectable } from "@angular/core";
import { Post } from "../home/post/Post";
import { HttpClient } from "@angular/common/http";
import { environment as env } from "../../environments/environment";
import { Observable } from "rxjs";
import { Usuario } from "./Usuario";

interface Categories {
  _id: string;
  catId: {
    _id: string;
    titulo: string;
  };
}

interface Tagers {
  _id: string;
  tagId: {
    _id: string;
    titulo: string;
  };
}

export interface UniquePost {
  post: {
    _id: string;
    titulo: string;
    descricao: string;
    corpo: string;
    banner: string;
    usuario: Usuario;
    updatedAt: string;
    visualizacao: number;
  };
  categorias: Categories[];
  tags: Tagers[];
}

export interface Visualizar {
  _id: string;
  visualizacao: number;
}

@Injectable({
  providedIn: "root",
})
export class PostagemService {
  constructor(private http: HttpClient) {}

  listarPost(id: string): Observable<UniquePost> {
    const apiUri: string = env.apiBaseUri + `posts/${id}`;
    return this.http.get<UniquePost>(apiUri);
  }

  visualizar(body: Visualizar): Observable<any> {
    const apiUri: string = env.apiBaseUri + "posts/visualizacao";
    return this.http.put(apiUri, body);
  }
}