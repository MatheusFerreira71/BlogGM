import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Comentario } from "../../../services/postagem.service";

@Component({
  selector: "app-comentario-card",
  templateUrl: "./comentario-card.component.html",
  styleUrls: ["./comentario-card.component.scss"],
})
export class ComentarioCardComponent implements OnInit {
  @Input() comentsData: Comentario[];
  @Output() comentRemoved = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}
}
