import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FirebaseService } from './firebase.service';
import { ErrorStateMatcher } from '@angular/material/core'
import { ReturnedUser, UserService } from '../sign-up-form/user.service';
import { State } from '../store/store';
import { Store } from '@ngrx/store';
import { setUser, toggleAuthState } from '../store/actions';
import { Router } from '@angular/router';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})

export class AuthComponent implements OnInit {
  hide = true;
  email: string;
  password: string;

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();

  constructor(private fireService: FirebaseService, private snackBar: MatSnackBar, private userSrv: UserService, private store: Store<State>, private router: Router) { }

  ngOnInit(): void {
  }

  handleSubmit(f: NgForm) {
    if (f.valid) {
      this.fireService.signInWithEmail(this.email, this.password).then(snapshot => {
        this.userSrv.findByUniqueId(snapshot.user.uid).subscribe(user => {
          this.setUser(user);
          this.router.navigate(['/']).then(() => {
            this.snackBar.open(`Usuário Logado com Sucesso ✓`, "Entendi", {
              duration: 5000,
            })
          })
        })
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

  setUser(user: ReturnedUser): void {
    this.store.dispatch(setUser({ payload: user }));
    this.store.dispatch(toggleAuthState());
  }
}
