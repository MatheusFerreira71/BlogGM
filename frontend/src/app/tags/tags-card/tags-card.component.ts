import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Tag } from "../../interfaces/Tag";
import { TagsService } from "../tags.service";

@Component({
  selector: "app-tags-card",
  templateUrl: "./tags-card.component.html",
  styleUrls: ["./tags-card.component.scss"],
})
export class TagsCardComponent implements OnInit {
  constructor(private tagSrv: TagsService) {}

  ngOnInit(): void {
    this.getAllTags();
  }

  allTags: Tag[];
  public paginaAtual = 1;

  getAllTags(): void {
    this.tagSrv.listarAll().subscribe((tags) => (this.allTags = tags));
  }

  pesquisa: string = "";

  pesquisar(form: NgForm): void {
    const titulo: string = form.value.pesquisa;
    this.getByName(titulo.toLowerCase());
  }

  getByName(titulo: string): void {
    this.tagSrv.listarByName(titulo).subscribe((tags) => (this.allTags = tags));
  }
}
