import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { ReturnedUser, UserService } from "./services/user.service";
import { setUser, setAuthState } from './store/actions';
import { FirebaseService } from "./services/firebase.service";
import { AngularFireAuth } from "@angular/fire/auth";
import { Reducers } from "./interfaces/Reducers";

@Component({
  selector: "app-root",
  template: `
    <app-spinner *ngIf="loading; else loaded"></app-spinner>
    <ng-template #loaded>
      <app-navbar></app-navbar>
      <section id="globalSection">
        <app-banner></app-banner>
        <router-outlet></router-outlet>
      </section>
      <app-footer></app-footer>
    </ng-template>
  `,
  styles: [],
})
export class AppComponent implements OnInit {

  loading = true

  constructor(private store: Store<Reducers>, private userSrv: UserService, private fireSrv: FirebaseService, private fireAuth: AngularFireAuth) { }

  async ngOnInit() {
    await this.fireAuth.onAuthStateChanged(async user => {
      if (user) {
        this.fireSrv.getCurrentUser().then(currentUser => {
          this.userSrv.findByUniqueId(currentUser.uid).subscribe(returnedUser => {
            this.setUser(returnedUser);
          })
        });
      }
      this.loading = false;
    })
  }

  setUser(user: ReturnedUser): void {
    this.store.dispatch(setUser({ payload: user }));
    this.store.dispatch(setAuthState({ payload: true }));
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('loggedIn', JSON.stringify(true));
  }
}
