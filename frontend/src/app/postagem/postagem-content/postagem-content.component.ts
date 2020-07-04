import { Component, OnInit } from "@angular/core";
import { PostagemService, UniquePost } from "../postagem.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-postagem-content",
  templateUrl: "./postagem-content.component.html",
  styleUrls: ["./postagem-content.component.scss"],
})
export class PostagemContentComponent implements OnInit {
  constructor(
    private postagemSrv: PostagemService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getPost();
  }

  uniquePost: UniquePost;
  categorias: string[];
  tags: string[];

  getPost(): void {
    const id = this.route.snapshot.paramMap.get("id");
    this.postagemSrv.listarPost(id).subscribe((post) => {
      this.uniquePost = post;
      this.categorias = post.categorias.map((cat) => cat.catId.titulo);
      this.tags = post.tags.map((tag) => tag.tagId.titulo);
    });
  }
}
