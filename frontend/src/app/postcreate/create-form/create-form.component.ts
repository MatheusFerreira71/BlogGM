import { Component, OnInit } from "@angular/core";
import { AngularEditorConfig } from "@kolkov/angular-editor";
import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { MatChipInputEvent } from "@angular/material/chips";
import { Categoria, ItemCategoria } from "../../interfaces/Categoria";
import { NavbarService } from "src/app/ui/navbar/navbar.service";
import { MatSelectChange } from "@angular/material/select";
import { NgForm } from "@angular/forms";
import { PostcreateService } from "../postcreate.service";
import { Router } from "@angular/router";

export interface TagsCadastro {
  titulo: string;
  tituloLower: string;
}

interface PostCreationBody {
  titulo: string;
  tituloLower: string;
  descricao: string;
  corpo: string;
  usuario: string;
}

export interface SubCat {
  catFilha: ItemCategoria;
}

@Component({
  selector: "app-create-form",
  templateUrl: "./create-form.component.html",
  styleUrls: ["./create-form.component.scss"],
})
export class CreateFormComponent implements OnInit {
  constructor(
    private catsGetter: NavbarService,
    private postManagementSrv: PostcreateService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAll();
  }

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: "25rem",
    minHeight: "5rem",
    placeholder: "Enter text here...",
    translate: "no",
    uploadUrl: "v1/images", // if needed
    customClasses: [
      // optional
      {
        name: "quote",
        class: "quote",
      },
      {
        name: "redText",
        class: "redText",
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ],
  };

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  tags: TagsCadastro[] = [];

  allCats: Categoria[];
  selectedCatId: string;
  selectedSubCatId: string;
  subCats: SubCat[] = [];
  banner: File;
  postBody: PostCreationBody = {} as PostCreationBody;

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || "").trim()) {
      this.tags.push({
        titulo: value.trim(),
        tituloLower: value.trim().toLowerCase(),
      });
    }

    // Reset the input value
    if (input) {
      input.value = "";
    }
  }

  remove(tag: TagsCadastro): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  getAll(): void {
    this.catsGetter.listarAll().subscribe((cats) => (this.allCats = cats));
  }

  selectCats(changeEvent: MatSelectChange): void {
    this.selectedSubCatId = undefined;
    this.catsGetter
      .listarSubCats(this.selectedCatId)
      .subscribe((subCats) => (this.subCats = subCats));
  }

  handleFileInput(file: File) {
    this.banner = file;
  }

  handleSubmit(form: NgForm) {
    this.postBody.tituloLower = this.postBody.titulo.toLowerCase();
    this.postBody.usuario = "5eff962716ac4d294cb825ac";
    const data = new FormData();
    const categorias = [this.selectedCatId];
    if (this.selectedSubCatId) {
      categorias.push(this.selectedSubCatId);
    }
    data.append("titulo", this.postBody.titulo);
    data.append("tituloLower", this.postBody.tituloLower);
    data.append("descricao", this.postBody.descricao);
    data.append("corpo", this.postBody.corpo);
    data.append("banner", this.banner);
    data.append("usuario", this.postBody.usuario);
    data.append("categorias", categorias.join(","));
    const tagsStrings = [];
    this.tags.forEach((tag) => {
      tagsStrings.push(
        `{"titulo": "${tag.titulo}", "tituloLower": "${tag.tituloLower}"}`
      );
    });
    data.append("tags", tagsStrings.join(";"));
    this.postManagementSrv.createPost(data).subscribe((postId) => {
      alert("Post Criado com sucesso");
      console.log(postId.createdPostId);
      this.router.navigate([`post/${postId.createdPostId}`]);
    });
  }
}
