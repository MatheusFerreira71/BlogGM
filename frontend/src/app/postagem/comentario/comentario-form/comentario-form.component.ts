import { Component, OnInit, Input } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ComentarioCreate, ComentarioService } from "../comentario.service";

@Component({
  selector: "app-comentario-form",
  templateUrl: "./comentario-form.component.html",
  styleUrls: ["./comentario-form.component.scss"],
})
export class ComentarioFormComponent implements OnInit {
  @Input() postId: string;
  constructor(private comentarioSrv: ComentarioService) {}

  ngOnInit(): void {}
  nome: string = "";
  email: string = "";
  texto: string = "";
  usuario: string = "";

  create(form: NgForm): void {
    const comentario: ComentarioCreate = {
      usuario: this.usuario,
      nome: this.nome,
      email: this.email,
      texto: this.texto,
      postId: this.postId,
    };
    console.log(comentario);
    if (form.valid) {
      this.comentarioSrv.create(comentario).subscribe();
    } else {
      alert("form Invalido");
    }
  }
}
