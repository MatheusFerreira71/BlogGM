import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment as env } from "../../../environments/environment";
import { Observable } from "rxjs";
import { Categoria } from "./Categoria";

@Injectable({
  providedIn: "root",
})
export class NavbarService {
  constructor(private http: HttpClient) {}

  private apiUri: string = `${env.apiBaseUri}categorias`;

  listarAll(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.apiUri);
  }
}
