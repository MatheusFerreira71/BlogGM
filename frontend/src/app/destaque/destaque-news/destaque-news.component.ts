import { Component, OnInit } from "@angular/core";
import { FirebaseService } from "src/app/auth/firebase.service";
import { Post } from "../../interfaces/Post";
import { DestaqueService } from "../destaque.service";

export interface PostsDestaques {
  bigPost: Post;
  postNews: Post[];
}

@Component({
  selector: "app-destaque-news",
  templateUrl: "./destaque-news.component.html",
  styleUrls: ["./destaque-news.component.scss"],
})
export class DestaqueNewsComponent implements OnInit {
  constructor(private destaqueSrv: DestaqueService, private fireSrv: FirebaseService) { }

  ngOnInit(): void {
    this.getAllPosts();
  }

  postData: PostsDestaques;

  getAllPosts(): void {
    this.destaqueSrv.listarAll().subscribe((posts) => {
      posts.postNews.forEach(async post => {
        post.banner = await this.fireSrv.getFileUrl(`banners/${post.banner}`).toPromise()
      })
      this.postData = posts;
    });
  }
}
