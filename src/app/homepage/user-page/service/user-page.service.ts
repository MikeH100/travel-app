import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserPageService {
  public items: Observable<any[]>;
  public followers: Observable<any[]>;
  public following: Observable<any[]>;

  constructor(
    private firestore: AngularFirestore
  ) { }

  public getAllUsers() {
    this.items = this.firestore.collection('users').valueChanges();
    return this.items;
  }

  public getFollowers(currentUserId: string) {
   this.followers = this.firestore.collection('follow').doc(currentUserId).collection('followers').valueChanges();
   return this.followers;
  }

  public getFollowedUsers(uid: string) {
    this.followers = this.firestore.collection('follow').doc(uid).collection('following').valueChanges();
    return this.followers;
  }

  public follow(followerId: string, followedId: string) {
    return new Promise<any>((resolve, reject) =>{
      this.firestore
      .collection('follow')
      .doc(followedId).collection('followers').add({
        followerId,
      })
      .then((resultFollower) => {
        this.firestore
        .collection('follow')
        .doc(followerId).collection('following').add({
          followedId,
        })
        .then((resultFollowed) => {
          resolve({resultFollower, resultFollowed});
        }).catch((error) => {
          reject(error);
        });
      }).catch((error) => {
        reject(error);
      });
    });
  }

  public getDocumentIdToRemoveFollower(id1: string, id2: string, followType: string, databaseId: string): Observable<any> {
    return this.firestore
    .collection('follow')
    .doc(id1).collection(followType, ref => ref.where(databaseId, '==', id2)).snapshotChanges().pipe(
      catchError(err => { throw new Error(err.error); }),
      map((resp) => {
        return resp;
      })
    );
  }

  public removeFollowerFromFirebase(followerId: string, docId: string, followType: string) {
    return new Promise<any>((resolve, reject) =>{
      this.firestore.collection('follow').doc(followerId).collection(followType).doc(docId).delete().then((data) => {
        resolve(data);
      }).catch((error) => {
        reject(error);
      });;
    });
  }
}
