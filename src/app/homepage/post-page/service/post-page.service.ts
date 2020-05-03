import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostPageService {

  constructor(
    private firestore: AngularFirestore
  ) { }

  postContentToFirebase(postContent: string, userId: string, docId?: string) {
    return new Promise<any>((resolve, reject) =>{
      if(docId) {
        this.firestore
        .collection('users').doc(docId).collection('posts').add({
          postContent,
          uid: userId
        }).then((result) => {
          resolve(result)
        }).catch((error) => {
          reject(error);
        });
      } else {
        this.firestore
        .collection('posts').add({
          postContent,
          uid: userId
        }).then((result) => {
          resolve(result)
        }).catch((error) => {
          reject(error);
        });
      }
    });
  }

  getDocumentIdToAddPosts(userId: string): Observable<any> {
    return this.firestore
    .collection('users', ref => ref.where('uid', '==', userId )).snapshotChanges().pipe(
      catchError(err => { throw new Error(err.error); }),
      map((resp) => {
        return resp;
      })
    );
  }

  getPostForCurrentUser(docId: string): Observable<any> {
    return this.firestore.collection('users').doc(docId).collection('posts').valueChanges().pipe(
      catchError(err => { throw new Error(err.error); }),
      map((resp) => {
        return resp;
      })
    );;
  }
}
