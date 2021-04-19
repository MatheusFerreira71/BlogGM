import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Tag } from "../../interfaces/Tag";
import { TagsService } from "../tags.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatDialog } from "@angular/material/dialog";
import { ConfirmDialogComponent } from "src/app/ui/confirm-dialog/confirm-dialog.component";
import { Store } from "@ngrx/store";
import { Reducers } from "src/app/interfaces/Reducers";
import { Observable } from "rxjs";
import { ReturnedUser } from "src/app/sign-up-form/user.service";

@Component({
  selector: "app-tags-card",
  templateUrl: "./tags-card.component.html",
  styleUrls: ["./tags-card.component.scss"],
})
export class TagsCardComponent implements OnInit {
  constructor(
    private tagSrv: TagsService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private store: Store<Reducers>
  ) {
    this.user$ = store.select(store => store.AuthState.user);
    this.loggedIn$ = store.select(store => store.AuthState.loggedIn);
  }

  ngOnInit(): void {
    this.getAllTags();
  }

  allTags: Tag[];
  loggedIn$: Observable<boolean>;
  user$: Observable<ReturnedUser>;
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

  async remove(_id: string): Promise<void> {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { question: "Deseja realmente excluir esta tag?" },
    });

    let result = await dialogRef.afterClosed().toPromise();

    if (result) {
      try {
        this.tagSrv.removeTag({ _id }).subscribe((tag) => {
          this.snackBar.open(`A tag ${tag.titulo} foi removida!`, "Entendi", {
            duration: 5000,
          });
          this.getAllTags();
        });
      } catch (erro) {
        this.snackBar.open(
          "ERRO: não foi possível excluir este item.",
          "Que pena!",
          { duration: 5000 }
        );
      }
    }
  }
}
