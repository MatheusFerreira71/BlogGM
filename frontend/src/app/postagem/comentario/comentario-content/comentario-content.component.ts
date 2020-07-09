import { Component, OnInit, Input } from "@angular/core";
import { Comentario } from "../../postagem.service";

@Component({
  selector: "app-comentario-content",
  templateUrl: "./comentario-content.component.html",
  styleUrls: ["./comentario-content.component.scss"],
})
export class ComentarioContentComponent implements OnInit {
  @Input() coment: Comentario;
  constructor() {}

  ngOnInit(): void {}
}
