import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment as env } from "../../environments/environment";
import { Observable } from "rxjs";
import { Tag } from "./Tag";

@Injectable({
  providedIn: "root",
})
export class TagsService {
  constructor(private http: HttpClient) {}

  private apiUri: string = `${env.apiBaseUri}tags`;

  listarAll(): Observable<Tag[]> {
    return this.http.get<Tag[]>(this.apiUri);
  }
}
