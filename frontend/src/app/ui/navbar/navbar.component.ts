import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { State } from "src/app/store/store";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
  loggedIn$: Observable<boolean>
  pesquisa: string = "";

  constructor(private route: Router, private store: Store<State>) {
    this.loggedIn$ = this.store.select('loggedIn');
  }

  ngOnInit(): void { }

  pesquisar(form: NgForm): void {
    const titulo: string = form.value.pesquisa;
    this.route.navigate(["busca/PostName"], {
      queryParams: { titulo: titulo.toLowerCase() },
    });
  }
}
