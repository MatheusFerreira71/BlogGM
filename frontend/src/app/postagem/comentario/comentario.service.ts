import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment as env } from "../../../environments/environment";
import { Comentario } from "../../postagem/postagem.service";

export interface ComentarioCreate {
  usuario: string | undefined;
  email: string | undefined;
  nome: string | undefined;
  texto: string;
  postId: string;
}

@Injectable({
  providedIn: "root",
})
export class ComentarioService {
  constructor(private http: HttpClient) {}

  private apiUri = `${env.apiBaseUri}comentarios`;
  create(body: ComentarioCreate): Observable<any> {
    return this.http.post(this.apiUri, body);
  }

  remove(body: { _id: string }): Observable<any> {
    return this.http.request("DELETE", this.apiUri, {
      body,
    });
  }
}
