import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ComentarioCreate, ComentarioService } from "../comentario.service";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-comentario-form",
  templateUrl: "./comentario-form.component.html",
  styleUrls: ["./comentario-form.component.scss"],
})
export class ComentarioFormComponent implements OnInit {
  @Input() postId: string;
  @Output() criarComentario = new EventEmitter();
  constructor(
    private comentarioSrv: ComentarioService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}
  nome: string = "";
  email: string = "";
  texto: string = "";
  usuario: string | undefined = undefined;

  create(form: NgForm): void {
    if (this.nome !== "" && this.texto !== "") {
      const comentario: ComentarioCreate = {
        usuario: this.usuario,
        nome: this.nome,
        email: this.email,
        texto: this.texto,
        postId: this.postId,
      };
      if (form.valid) {
        this.comentarioSrv.create(comentario).subscribe((coment) => {
          this.nome = "";
          this.email = "";
          this.texto = "";
          this.snackBar.open("Comentário Criado com Sucesso!", "Entendi", {
            duration: 5000,
          });
          this.criarComentario.emit();
        });
      } else {
        this.snackBar.open("Form Inválido. 🦦", "Entendi", {
          duration: 5000,
        });
      }
    } else {
      this.snackBar.open("Preencha o Nome e Texto do comentário", "Entendi", {
        duration: 5000,
      });
    }
  }
}
