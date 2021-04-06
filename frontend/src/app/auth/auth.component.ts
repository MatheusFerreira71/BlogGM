import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FirebaseService } from './firebase.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})

export class AuthComponent implements OnInit {
  hide = true;
  email: string;
  password: string;

  constructor(private fireService: FirebaseService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  async handleSubmit(f: NgForm) {
    if(f.valid) {
      await this.fireService.signInWithEmail(this.email, this.password).then(res => {
        console.log(res)
      }).catch(err => {
        this.snackBar.open(`Algo deu errado! ❌ ${err} `, "Entendi", {
          duration: 5000,
        });
      })
    } else {
      this.snackBar.open("Preencha os campos corretamente! ❌ 🦦", "Entendi", {
        duration: 5000,
      });
    }
  }
}
