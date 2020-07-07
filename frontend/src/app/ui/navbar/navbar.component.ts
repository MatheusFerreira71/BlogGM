import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
  constructor(private route: Router) {}
  pesquisa: string = "";
  ngOnInit(): void {}

  pesquisar(form: NgForm): void {
    const titulo: string = form.value.pesquisa;
    this.route.navigate(["busca/PostName"], {
      queryParams: { titulo: titulo.toLowerCase() },
    });
  }
}
