import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FollowService {
  items: Observable<any[]>;

  constructor(private db: AngularFireDatabase,
    private firestore: AngularFirestore) { }

  getAllUsers() {
    this.items = this.firestore.collection('users').valueChanges();
    return this.items;
  }


}
