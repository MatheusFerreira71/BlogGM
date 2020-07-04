import { Component, OnInit } from "@angular/core";
import { PostService } from "../post.service";
import { Post } from "../Post";

interface PostData {
  _id: string;
  postId: Post;
}

@Component({
  selector: "app-post-news",
  templateUrl: "./post-news.component.html",
  styleUrls: ["./post-news.component.scss"],
})
export class PostNewsComponent implements OnInit {
  //Public é desnecessário, se deixar vazio fica automaticamente public
  public postsNoticias = [] as PostData[]; //Vetor vazio
  public postsAnalises = [] as PostData[]; //Vetor vazio
  public postsDestaques = [] as PostData[]; //Vetor vazio
  allPosts: Post[]; //Vetor vazio
  public paginaAtual = 1;

  displayedColumns: string[] = [
    "titulo",
    "descricao",
    "corpo",
    "banner",
    "avaliacao",
    "usuario",
    "createdAt",
  ];

  constructor(private postSrv: PostService) {}

  ngOnInit() {
    this.getAllPosts();
  }

  getAllPosts(): void {
    this.postSrv.listarAll().subscribe((posts) => (this.allPosts = posts));
  }
  async excluirItem(id: string) {
    if (confirm("Deseja realmente excluir este item?")) {
      try {
        await this.postSrv.excluir(id);
        this.ngOnInit(); // Para atualizar os dados da tabela
        // Simple message.
      } catch (erro) {
        // alert("ERRO: Não foi possível excluir este item");
      }
    }
  }
}
