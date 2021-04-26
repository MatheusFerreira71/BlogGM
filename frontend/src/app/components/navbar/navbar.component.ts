import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { FirebaseService } from "src/app/services/firebase.service";
import { Reducers } from "src/app/interfaces";
import { setUser, setAuthState } from '../../store/actions'

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
  loggedIn$: Observable<boolean>
  pesquisa: string = "";

  constructor(private route: Router, private store: Store<Reducers>, private fireSrv: FirebaseService, private matSnack: MatSnackBar) {
    this.loggedIn$ = store.select(store => store.AuthState.loggedIn)
  }

  ngOnInit(): void { }

  pesquisar(form: NgForm): void {
    const titulo: string = form.value.pesquisa;
    this.route.navigate(["busca/PostName"], {
      queryParams: { titulo: titulo.toLowerCase() },
    });
  }

  signOut(): void {
    this.fireSrv.signOut().then(() => {
      this.store.dispatch(setUser({ payload: null }))
      this.store.dispatch(setAuthState({ payload: false }));
      localStorage.removeItem('user');
      localStorage.removeItem('loggedIn')
      this.route.navigate(['/']).then(() => {
        this.matSnack.open('Usuário deslogado com sucesso.', 'Entendi', { duration: 5000 })
      })
    })
  }
}
