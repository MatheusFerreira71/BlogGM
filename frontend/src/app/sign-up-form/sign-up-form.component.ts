import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService } from '../auth/firebase.service';
import { ConfirmDialogComponent } from '../ui/confirm-dialog/confirm-dialog.component';
import { UserService, User, ReturnedUser } from './user.service'
import { Observable, timer } from 'rxjs'
import { Store } from '@ngrx/store'
import { State } from '../store/store';
import { setUser, toggleAuthState } from '../store/actions';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.scss']
})
export class SignUpFormComponent implements OnInit {
  admLog = false;
  hide = true;
  hideConfirm = true;
  confirmPassword: string;
  email: string;
  nome: string;
  username: string;
  bio: string;
  isAdm: boolean;
  password: string;
  avatarImage: File;
  avatar: string;
  user$: Observable<ReturnedUser>
  upPercentage$: Observable<number>

  constructor(
    private routes: ActivatedRoute,
    private userSrv: UserService,
    private firebaseSrv: FirebaseService,
    private snackBar: MatSnackBar,
    private router: Router,
    private dialog: MatDialog,
    private store: Store<State>
  ) {
    this.user$ = this.store.select('user');
  }

  ngOnInit(): void {
    const route = this.routes.snapshot.routeConfig.path;
    if (route === 'adm-sign-up') {
      this.admLog = true
    }
  }

  setUser(user: ReturnedUser): void {
    this.store.dispatch(setUser({ payload: user }));
    this.store.dispatch(toggleAuthState());
  }

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();

  handleSubmit(f: NgForm) {
    if (!this.admLog) {
      this.isAdm = false
    }
    if (f.valid) {
      if (this.password === this.confirmPassword) {
        this.userSrv.findByUsername(this.username).subscribe(returnedUser => {
          if (!returnedUser) {
            this.firebaseSrv.signUpWithEmail(this.email, this.password).then(res => {
              const uid = res.user.uid;
              const user: User = {
                email: this.email,
                nome: this.nome,
                username: this.username,
                bio: this.bio,
                isAdm: this.isAdm,
                uniqueId: uid,
                avatar: this.avatar
              }
              if (this.avatarImage) {
                const tarefaUpload = this.firebaseSrv.uploadFile(`avatars/${this.avatar}`, this.avatarImage);
                this.upPercentage$ = tarefaUpload.percentageChanges()
                tarefaUpload.then(() => {
                  timer(1000).subscribe(() => {
                    this.userSrv.createUser(user).subscribe(returnedUser => {
                      this.setUser(returnedUser);
                      this.router.navigate(['/']).then(() => {
                        this.snackBar.open(`Usuário Criado com Sucesso ✓`, "Entendi", {
                          duration: 5000,
                        })
                      })
                    }, error => {
                      console.log(error);
                      this.firebaseSrv.deleteFile(`avatars/${this.avatar}`).subscribe(() => {
                        this.upPercentage$ = undefined;
                        this.firebaseSrv.deleteAccount().then(() => {
                          this.snackBar.open('Algo deu errado, tente novamente', 'Entendi', {
                            duration: 5000
                          })
                        })
                      })
                    })
                  })
                }).catch(err => {
                  this.snackBar.open(`Algo deu errado! ❌ ${err} `, "Entendi", {
                    duration: 5000,
                  });
                })
              } else {
                this.userSrv.createUser(user).subscribe(returnedUser => {
                  this.setUser(returnedUser);
                  this.router.navigate(['/']).then(() => {
                    this.snackBar.open(`Usuário Criado com Sucesso ✓`, "Entendi", {
                      duration: 5000,
                    })
                  })
                }, error => {
                  console.log(error);
                  this.firebaseSrv.deleteAccount().then(() => {
                    this.snackBar.open('Algo deu errado, tente novamente', 'Entendi', {
                      duration: 5000
                    })
                  })
                })
              }
            }).catch(err => {
              this.snackBar.open(`Algo deu errado! ❌ ${err} `, "Entendi", {
                duration: 5000,
              });
            })
          } else {
            this.snackBar.open("Nome de usuário não disponível! ❌ 🦦", "Entendi", {
              duration: 5000,
            });
          }
        })
      } else {
        this.snackBar.open(`Senhas não coincidem! ❌`, "Entendi", {
          duration: 5000,
        });
      }
    }
  }

  async voltar(f: NgForm) {
    let result = true;
    if (f.dirty && f.touched) {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        data: { question: "Há dados não salvos. Deseja realmente voltar?" },
      });

      result = await dialogRef.afterClosed().toPromise();
    }
    if (result) {
      this.router.navigate(['/'])
    }
  }

  handleFileInput(file: File) {
    if (
      file.type === "image/jpg" ||
      file.type === "image/jpeg" ||
      file.type === "image/png" ||
      file.type === "image/bmp"
    ) {
      this.avatarImage = file;
      const hash = Math.floor(Math.random() * (9999999999 - 1000000000 + 1) + 1000000000)
      this.avatar = `${hash}-${file.name}`;
    } else {
      this.snackBar.open(
        "Selecione um arquivo JPG / JPEG / PNG / BMP",
        "Entendi",
        { duration: 5000 }
      );
    }
  }
}
