import { Component, OnInit } from "@angular/core";
import { Post } from "../../home/post/Post";
import { DestaqueService } from "../destaque.service";

interface PostsDestaques {
  bigPost: Post;
  postNews: Post[];
}

@Component({
  selector: "app-destaque-news",
  templateUrl: "./destaque-news.component.html",
  styleUrls: ["./destaque-news.component.scss"],
})
export class DestaqueNewsComponent implements OnInit {
  constructor(private destaqueSrv: DestaqueService) {}

  ngOnInit(): void {
    this.getAllPosts();
  }
  postData: PostsDestaques;

  getAllPosts(): void {
    this.destaqueSrv.listarAll().subscribe((posts) => (this.postData = posts));
  }
}
