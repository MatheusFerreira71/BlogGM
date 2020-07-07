import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment as env } from "../../environments/environment";
import { PostData } from "../home/review/review.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class SearchService {
  constructor(private http: HttpClient) {}

  listarPostTagOrCat(id: string, type: string): Observable<PostData[]> {
    const params = new HttpParams().set("type", type).set("id", id);
    const apiUri = `${env.apiBaseUri}posts/busca?${params.toString()}`;
    return this.http.get<PostData[]>(apiUri);
  }

  listarPostName(name: string, type: string) {
    const params = new HttpParams().set("type", type).set("name", name);
    const apiUri = `${env.apiBaseUri}/posts/busca?${params.toString()}`;
  }
}
