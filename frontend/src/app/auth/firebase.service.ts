import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(public firebaseAuth: AngularFireAuth) { }

  async signInWithEmail(email: string, password: string) {
    return await this.firebaseAuth.signInWithEmailAndPassword(email, password)
  }

  async signUpWithEmail(email: string, password: string) {
    return await this.firebaseAuth.createUserWithEmailAndPassword(email, password)
  }

  signOut () {
    this.firebaseAuth.signOut()
  }
}
