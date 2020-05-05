import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class PostPageService {

  constructor(
    private firestore: AngularFirestore
  ) { }

  public postContentToFirebase(postContent: string, tag: string, userId?: string, docId?: string) {
    return new Promise<any>((resolve, reject) =>{
      if(docId) {
        this.firestore
        .collection('users').doc(docId).collection('posts').add({
          postContent,
          tag
        }).then((result) => {
          resolve(result)
        }).catch((error) => {
          reject(error);
        });
      } else {
        this.firestore
        .collection('posts').add({
          postContent,
          uid: userId,
          tag
        }).then((result) => {
          resolve(result)
        }).catch((error) => {
          reject(error);
        });
      }
    });
  }

  public postTagToFirebase(tag: string, uid: string) {
    return new Promise<any>((resolve, reject) =>{
        this.firestore
        .collection('tags').doc(tag).set({
          tag,
          uid,
          count: firebase.firestore.FieldValue.increment(1),
        }, { merge: true }).then((result) => {
          resolve(result)
        }).catch((error) => {
          reject(error);
        });
    });
  }

  public getPostForCurrentUser(docId: string): Observable<any> {
    return this.firestore.collection('users').doc(docId).collection('posts').valueChanges().pipe(
      catchError(err => { throw new Error(err.error); }),
      map((resp) => {
        return resp;
      })
    );
  }
}
