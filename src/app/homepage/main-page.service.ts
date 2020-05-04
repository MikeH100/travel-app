import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MainPageService {

  constructor(private firestore: AngularFirestore) { }

  getTrendingTags(): Observable<any> {
    return this.firestore.collection('tags', ref => ref.orderBy('count', 'desc')).valueChanges().pipe(
      catchError(err => { throw new Error(err.error); }),
      map((resp) => {
        return resp;
      })
    );;
  }
}
