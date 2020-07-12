import { Component, OnInit, Input } from "@angular/core";
import { Post } from "../interfaces/Post";
import { PostData } from "../home/review/review.service";

@Component({
  selector: "app-postlist",
  templateUrl: "./postlist.component.html",
  styleUrls: ["./postlist.component.scss"],
})
export class PostlistComponent implements OnInit {
  //Public é desnecessário, se deixar vazio fica automaticamente public
  public paginaAtual = 1;

  constructor() {}
  @Input() postData: Post[] | PostData[];
  @Input() itemsPerPage: number;
  ngOnInit(): void {}
}
