import { Component, OnInit } from "@angular/core";
import { Tag } from "../Tag";
import { TagsService } from "../tags.service";

@Component({
  selector: "app-tags-content",
  templateUrl: "./tags-content.component.html",
  styleUrls: ["./tags-content.component.scss"],
})
export class TagsContentComponent implements OnInit {
  constructor(private tagSrv: TagsService) {}

  ngOnInit(): void {
    this.getAllTags();
  }

  allTags: Tag[];

  getAllTags(): void {
    this.tagSrv.listarAll().subscribe((tags) => (this.allTags = tags));
  }
}
