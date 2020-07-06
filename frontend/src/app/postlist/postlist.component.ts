import { Component, OnInit, Input } from "@angular/core";
import { PostService } from "../home/post/post.service";
import { Post } from "../home/post/Post";
import { PostData } from "../home/review/review.service";

@Component({
  selector: "app-postlist",
  templateUrl: "./postlist.component.html",
  styleUrls: ["./postlist.component.scss"],
})
export class PostlistComponent implements OnInit {
  //Public é desnecessário, se deixar vazio fica automaticamente public
  public paginaAtual = 1;

  constructor(private postSrv: PostService) {}
  @Input() postData: Post[] | PostData[];
  @Input() itemsPerPage: number;
  ngOnInit(): void {}
}
