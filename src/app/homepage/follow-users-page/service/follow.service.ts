import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FollowService {
  public items: Observable<any[]>;
  public followingUsers: Observable<any[]>;

  constructor(private db: AngularFireDatabase,
    private firestore: AngularFirestore) { }

  public getAllUsers() {
    this.items = this.firestore.collection('users').valueChanges();
    return this.items;
  }

  public getFollowingUsers(currentUserId) {
   this.followingUsers = this.firestore.collection('follow').doc(currentUserId).collection('following').valueChanges();
   return this.followingUsers;
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

  getDocumentIdToRemoveFollower(id1: string, id2: string, followType: string, databaseId: string): Observable<any> {
    console.log(id1, id2);
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
