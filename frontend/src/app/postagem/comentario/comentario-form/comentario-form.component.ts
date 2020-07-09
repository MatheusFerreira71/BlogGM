import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ComentarioCreate, ComentarioService } from "../comentario.service";

@Component({
  selector: "app-comentario-form",
  templateUrl: "./comentario-form.component.html",
  styleUrls: ["./comentario-form.component.scss"],
})
export class ComentarioFormComponent implements OnInit {
  @Input() postId: string;
  @Output() criarComentario = new EventEmitter();
  constructor(private comentarioSrv: ComentarioService) {}

  ngOnInit(): void {}
  nome: string = "";
  email: string = "";
  texto: string = "";
  usuario: string | undefined = undefined;

  create(form: NgForm): void {
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
        this.criarComentario.emit();
      });
    } else {
      alert("form Invalido");
    }
  }
}
