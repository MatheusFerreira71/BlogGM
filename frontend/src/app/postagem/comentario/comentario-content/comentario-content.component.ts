import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Comentario } from "../../postagem.service";
import { ComentarioService } from "../comentario.service";
import { ConfirmDialogComponent } from "src/app/ui/confirm-dialog/confirm-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";

@Component({
  selector: "app-comentario-content",
  templateUrl: "./comentario-content.component.html",
  styleUrls: ["./comentario-content.component.scss"],
})
export class ComentarioContentComponent implements OnInit {
  @Input() coment: Comentario;
  @Input() postId: string;
  @Output() comentRemoved = new EventEmitter();
  constructor(
    private comentarioSrv: ComentarioService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {}

  async removeComent(_id: string): Promise<void> {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { question: "Deseja realmente excluir este comentário?" },
    });

    let result = await dialogRef.afterClosed().toPromise();

    if (result) {
      try {
        this.comentarioSrv.remove({ _id }).subscribe(() => {
          this.router.navigate([`/post/${this.postId}`]).then(() => {
            this.comentRemoved.emit();
            this.snackBar.open("Exclusão efetuada com sucesso.", "Entendi", {
              duration: 5000,
            });
          });
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
