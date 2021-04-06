import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(public firebaseAuth: AngularFireAuth) { }

  async signInWithEmail(email: string, password: string) {
    return await this.firebaseAuth.signInWithEmailAndPassword(email, password).then(res => {
      console.log(res)
    })
  }

  async signUpWithEmail(email: string, password: string) {
    return await this.firebaseAuth.createUserWithEmailAndPassword(email, password).then(res => {
      console.log(res)
    })
  }

  signOut () {
    this.firebaseAuth.signOut()
  }
}
