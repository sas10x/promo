import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction, DocumentData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Customer } from '../model/customer';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private angularFirestore: AngularFirestore) { }
  getCustomers(): Observable<DocumentChangeAction<DocumentData>[]> {
    return this.angularFirestore.collection('customers').snapshotChanges();
  }
  deleteUser(uid) {
    return this.angularFirestore
      .collection("customers")
      .doc(uid)
      .delete();
  }
}
