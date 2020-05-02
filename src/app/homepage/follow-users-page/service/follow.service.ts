import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FollowService {
  public items: Observable<any[]>;
  public followingUsers: Observable<any[]>;
  public test: Observable<any[]>;

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
        followerId: followerId,
      })
      .then((resultFollower) => {
        this.firestore
        .collection('follow')
        .doc(followerId).collection('following').add({
          followedId: followedId,
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

  unfollow(followerId: string, followedId: string) {
      return this.firestore
      .collection('follow')
      .doc(followerId).collection('following', ref => ref.where('followedId', '==', followedId)).snapshotChanges();
  }

  public removeFollowerFromFirebase(followerId, docId) {
    return new Promise<any>((resolve, reject) =>{
      this.firestore.collection('follow').doc(followerId).collection('following').doc(docId).delete().then((data) => {
        resolve(data);
      }).catch((error) => {
        reject(error);
      });;
    });
  }
}
