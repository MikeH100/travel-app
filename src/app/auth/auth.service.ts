import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user: Observable<firebase.User>;
  public userDetails: firebase.User = null;

  constructor(
    public firebaseAuth: AngularFireAuth,
    public router: Router,
    private firestore: AngularFirestore
    ) {
      this.user = firebaseAuth.authState;
      this.user.subscribe(
        (user) => {
          if (user) {
            this.userDetails = user;
          } else {
            this.userDetails = null;
          }
        }
      );
    }

  signInWithGoogle() {
    return this.firebaseAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then((result) => {
      if (result.additionalUserInfo.isNewUser) {
        return new Promise<any>((resolve, reject) =>{
          this.firestore
          .collection('users')
          .add({
            name: result.user.displayName,
            uid: result.user.uid
          })
          .then((resultFromDb) => {
            resolve(resultFromDb);
          }).catch((error) => {
            reject(error);
          });
        });
      } else {
        return result
      }
    }).catch((error) => {
      return error
    });
  }

  logout() {
    this.firebaseAuth.auth.signOut()
    .then((res) => this.router.navigate(['/']));
  }

}
