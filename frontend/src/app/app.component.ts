import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { ReturnedUser, UserService } from "./sign-up-form/user.service";
import { State } from "./store/store";
import { setUser, toggleAuthState } from './store/actions';
import { FirebaseService } from "./auth/firebase.service";
import { AngularFireAuth } from "@angular/fire/auth";

@Component({
  selector: "app-root",
  template: `
    <app-navbar></app-navbar>
    <section id="globalSection">
      <app-banner></app-banner>
      <router-outlet></router-outlet>
    </section>
    <app-footer></app-footer>
  `,
  styles: [],
})
export class AppComponent implements OnInit {

  constructor(private store: Store<State>, private userSrv: UserService, private fireSrv: FirebaseService, private fireAuth: AngularFireAuth) { }

  async ngOnInit() {
    await this.fireAuth.onAuthStateChanged(async user => {
      if (user) {
        const currentUser = await this.fireSrv.getCurrentUser();
        this.userSrv.findByUniqueId(currentUser.uid).subscribe(returnedUser => {
          this.setUser(returnedUser);
        })
      }
    })
  }

  setUser(user: ReturnedUser): void {
    this.store.dispatch(setUser({ payload: user }));
    this.store.dispatch(toggleAuthState());
  }
}
