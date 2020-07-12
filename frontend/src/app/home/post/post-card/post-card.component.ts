import { Component, OnInit } from "@angular/core";
import { PostService } from "../post.service";
import { Post } from "../../../interfaces/Post";

@Component({
  selector: "app-post-card",
  templateUrl: "./post-card.component.html",
  styleUrls: ["./post-card.component.scss"],
})
export class PostCardComponent implements OnInit {
  constructor(private postSrv: PostService) {}

  ngOnInit() {
    this.getAllPosts();
  }

  allPosts: Post[];

  getAllPosts(): void {
    this.postSrv.listarAll().subscribe((posts) => (this.allPosts = posts));
  }
}
