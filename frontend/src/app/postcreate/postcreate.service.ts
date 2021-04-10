import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment as env } from "../../environments/environment";
import { Usuario } from "../interfaces/Usuario";
export interface PostCreationBody {
  titulo: string;
  tituloLower: string;
  descricao: string;
  corpo: string;
  usuario: string;
}

export interface TagsCadastro {
  titulo: string;
  tituloLower: string;
}
export interface PostEditionBody extends PostCreationBody {
  _id: string;
  categorias: string[];
  tags: TagsCadastro[];
}

@Injectable({
  providedIn: "root",
})
export class PostcreateService {
  constructor(private http: HttpClient) {}

  private apiUri = `${env.apiBaseUri}posts`;

  createPost(body: FormData): Observable<{ createdPostId: string }> {
    return this.http.post<{ createdPostId: string }>(this.apiUri, body);
  }

  listUsers(): Observable<Usuario[]> {
    const apiUserUri = `${env.apiBaseUri}usuarios`;
    return this.http.get<Usuario[]>(apiUserUri);
  }

  updatePost(body: PostEditionBody): Observable<{ edited: boolean }> {
    return this.http.put<{ edited: boolean }>(this.apiUri, body);
  }
}
