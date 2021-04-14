import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Comentario } from "../../postagem.service";
import { ComentarioService } from "../comentario.service";
import { ConfirmDialogComponent } from "src/app/ui/confirm-dialog/confirm-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { FirebaseService } from "src/app/auth/firebase.service";
import { ReturnedUser } from "src/app/sign-up-form/user.service";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { Reducers } from "src/app/interfaces/Reducers";

@Component({
  selector: "app-comentario-content",
  templateUrl: "./comentario-content.component.html",
  styleUrls: ["./comentario-content.component.scss"],
})
export class ComentarioContentComponent implements OnInit {
  @Input() coment: Comentario;
  @Output() comentRemoved = new EventEmitter();
  avatarUrl: string;
  user$: Observable<ReturnedUser>
  loggedIn$: Observable<boolean>

  constructor(
    private comentarioSrv: ComentarioService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router,
    private fireSrv: FirebaseService,
    private store: Store<Reducers>
  ) {
    this.user$ = store.select(store => store.AuthState.user);
    this.loggedIn$ = store.select(store => store.AuthState.loggedIn);
  }

  ngOnInit(): void {
    this.fireSrv.getFileUrl(`avatars/${this.coment.usuario.avatar}`).subscribe(url => this.avatarUrl = url);
  }

  async removeComent(_id: string): Promise<void> {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { question: "Deseja realmente excluir este comentário?" },
    });

    let result = await dialogRef.afterClosed().toPromise();

    if (result) {
      try {
        this.comentarioSrv.remove({ _id }).subscribe(() => {
          this.router.navigate([`/post/${this.coment.postId}`]).then(() => {
            this.comentRemoved.emit();
            this.snackBar.open("Exclusão efetuada com sucesso.", "Entendi", {
              duration: 5000,
            });
          });
        });
      } catch (erro) {
        this.snackBar.open(
          `ERRO: não foi possível excluir este item. ${erro}`,
          "Que pena!",
          { duration: 5000 }
        );
      }
    }
  }
}
