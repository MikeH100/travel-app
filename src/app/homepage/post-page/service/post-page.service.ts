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

  postContentToFirebase(postContent: string, userId: string) {
    return new Promise<any>((resolve, reject) =>{
      this.firestore
      .collection('posts').add({
        'post-content': postContent,
        uid: userId
      }).then((result) => {
        console.log('posted');
      }).catch((error) => {
        reject(error);
      });;
    });
  }
}
