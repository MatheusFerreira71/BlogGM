import { Component, OnInit } from "@angular/core";
import { Post } from "../../interfaces/Post";
import { DestaqueService } from "../destaque.service";

interface PostsDestaques {
  bigPost: Post;
  postNews: Post[];
}

@Component({
  selector: "app-destaque-bignews",
  templateUrl: "./destaque-bignews.component.html",
  styleUrls: ["./destaque-bignews.component.scss"],
})
export class DestaqueBignewsComponent implements OnInit {
  constructor(private destaqueSrv: DestaqueService) {}

  ngOnInit(): void {
    this.getAllPosts();
  }

  postData: PostsDestaques;

  getAllPosts(): void {
    this.destaqueSrv.listarAll().subscribe((posts) => (this.postData = posts));
  }
}
