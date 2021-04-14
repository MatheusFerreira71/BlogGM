import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment as env } from "../../environments/environment";
import { Observable } from "rxjs";
import { Usuario } from "../interfaces/Usuario";
import { ReturnedUser } from "../sign-up-form/user.service";

interface Categories {
  _id: string;
  catId: {
    _id: string;
    titulo: string;
  };
}

export interface Comentario {
  _id: string;
  usuario: ReturnedUser
  texto: string;
  postId: string;
  updatedAt: string;
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
  comentarios: Comentario[];
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

  removePost(body: { _id: string }): Observable<{ removed: boolean }> {
    const apiUri: string = `${env.apiBaseUri}posts`;
    return this.http.request<{ removed: boolean }>("DELETE", apiUri, { body });
  }
}
