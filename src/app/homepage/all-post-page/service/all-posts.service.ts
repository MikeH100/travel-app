import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AllPostsService {

  constructor(
    private firestore: AngularFirestore
  ) { }

  public getAllPosts(): Observable<any> {
    return this.firestore.collection('posts').valueChanges().pipe(
      catchError(err => { throw new Error(err.error); }),
      map((resp) => {
        return resp;
      })
    );
  }
}
