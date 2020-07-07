import { Component, OnInit } from "@angular/core";
import { PostagemService, UniquePost } from "../postagem.service";
import { ActivatedRoute } from "@angular/router";
import { formatDate } from "@angular/common";

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
  formatedDate: string;

  getPost(): void {
    const id = this.route.snapshot.paramMap.get("id");
    this.postagemSrv.listarPost(id).subscribe((post) => {
      this.uniquePost = post;
      this.categorias = post.categorias.map((cat) => cat.catId.titulo);
      this.tags = post.tags.map((tag) => tag.tagId.titulo);
      this.formatedDate = formatDate(post.post.updatedAt, "fullDate", "pt-BR");
      const { _id, visualizacao } = post.post;
      const novaView = visualizacao + 1;
      this.postagemSrv
        .visualizar({
          _id,
          visualizacao: novaView,
        })
        .subscribe();
    });
  }
}
