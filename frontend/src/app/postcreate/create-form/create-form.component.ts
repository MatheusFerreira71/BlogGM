import { Component, OnInit } from "@angular/core";
import { AngularEditorConfig } from "@kolkov/angular-editor";
import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { MatChipInputEvent } from "@angular/material/chips";
import { Categoria, ItemCategoria } from "../../interfaces/Categoria";
import { NavbarService } from "src/app/ui/navbar/navbar.service";
import { MatSelectChange } from "@angular/material/select";
import { NgForm } from "@angular/forms";
import { PostcreateService, PostEditionBody } from "../postcreate.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Usuario } from "../../interfaces/Usuario";
import { PostagemService } from "src/app/postagem/postagem.service";
import { MatDialog } from "@angular/material/dialog";
import { ConfirmDialogComponent } from "src/app/ui/confirm-dialog/confirm-dialog.component";
import { MatSnackBar } from "@angular/material/snack-bar";

export interface TagsCadastro {
  titulo: string;
  tituloLower: string;
}

export interface PostCreationBody {
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
    private router: Router,
    private routes: ActivatedRoute,
    private postGetter: PostagemService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getAll();
    this.getUsers();
    this.isUpdate();
  }

  getUsers(): void {
    this.postManagementSrv
      .listUsers()
      .subscribe((users) => (this.usuarios = users));
  }

  isUpdate(): void {
    const id = this.routes.snapshot.paramMap.get("id");

    if (id) {
      try {
        this.titulo = "Editando um Post";
        this.uploadEnabler = false;
        this.postGetter.listarPost(id).subscribe((post) => {
          this.postBody.titulo = post.post.titulo;
          this.postBody.descricao = post.post.descricao;
          this.postBody.corpo = post.post.corpo;
          this.postBody.usuario = post.post.usuario._id;
          this.selectedCatId = post.categorias[0].catId._id;
          this.selectCats(this.e);
          if (post.categorias.length === 2) {
            this.selectedSubCatId = post.categorias[1].catId._id;
          }
          const transformedTags = post.tags.map((tag) => ({
            titulo: tag.tagId.titulo,
            tituloLower: tag.tagId.titulo.toLowerCase(),
          }));
          this.tags = transformedTags;
        });
      } catch (erro) {
        console.log(erro);
        this.snackBar.open("Que pena. 🦦", "Entendi", {
          duration: 5000,
        });
      }
    }
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

  uploadEnabler: boolean = true;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  tags: TagsCadastro[] = [];
  e: MatSelectChange;
  allCats: Categoria[];
  selectedCatId: string;
  selectedSubCatId: string;
  subCats: SubCat[] = [];
  banner: File;
  postBody: PostCreationBody = {} as PostCreationBody;
  usuarios: Usuario[];
  titulo: string = "Crie um novo post";

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
    const id = this.routes.snapshot.paramMap.get("id");
    if (id) {
      const categorias = [this.selectedCatId];
      if (this.selectedSubCatId) {
        categorias.push(this.selectedSubCatId);
      }
      this.postBody.tituloLower = this.postBody.titulo.toLowerCase();

      const editionBody: PostEditionBody = {
        _id: id,
        ...this.postBody,
        categorias,
        tags: this.tags,
      };

      this.postManagementSrv.updatePost(editionBody).subscribe((response) => {
        if (response.edited) {
          this.router.navigate([`post/${id}`]).then(() => {
            this.snackBar.open("Post Editado com Sucesso!", "Entendi", {
              duration: 5000,
            });
          });
        } else {
          this.snackBar.open("Que pena!", "Entendi", {
            duration: 5000,
          });
        }
      });
    } else {
      this.postBody.tituloLower = this.postBody.titulo.toLowerCase();
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
        this.router.navigate([`post/${postId.createdPostId}`]).then(() => {
          this.snackBar.open("Post Criado com Sucesso!", "Entendi", {
            duration: 5000,
          });
        });
      });
    }
  }

  async voltar(form: NgForm): Promise<void> {
    let result = true;
    console.log(form);
    if (form.dirty && form.touched) {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        width: "50%",
        data: { question: "Há dados não salvos. Deseja realmente voltar?" },
      });

      result = await dialogRef.afterClosed().toPromise();
    }
    const id = this.routes.snapshot.paramMap.get("id");
    if (result) {
      this.router.navigate([`/post/${id}`]);
    }
  }
}
