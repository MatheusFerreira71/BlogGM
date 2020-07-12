import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment as env } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class PostcreateService {
  constructor(private http: HttpClient) {}

  private apiUri = `${env.apiBaseUri}posts`;

  createPost(body: FormData): Observable<{ createdPostId: string }> {
    return this.http.post<{ createdPostId: string }>(this.apiUri, body);
  }
}
