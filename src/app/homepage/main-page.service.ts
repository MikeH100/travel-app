import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MainPageService {

  constructor(
    private firestore: AngularFirestore
  ) { }

  public getTrendingTags(): Observable<any> {
    return this.firestore.collection('tags', ref => ref.orderBy('count', 'desc')).valueChanges().pipe(
      catchError(err => { throw new Error(err.error); }),
      map((resp) => {
        return resp;
      })
    );;
  }

  public getDocumentIdUser(userId: string): Observable<any> {
    return this.firestore
    .collection('users', ref => ref.where('uid', '==', userId )).snapshotChanges().pipe(
      catchError(err => { throw new Error(err.error); }),
      map((resp) => {
        return resp;
      })
    );
  }

  public getPostForSelectedUser(docId: string): Observable<any> {
    return this.firestore.collection('users').doc(docId).collection('posts').valueChanges().pipe(
      catchError(err => { throw new Error(err.error); }),
      map((resp) => {
        return resp;
      })
    );
  }
}
