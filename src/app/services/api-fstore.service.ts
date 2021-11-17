import { Injectable } from '@angular/core';
import { AngularFirestore} from '@angular/fire/firestore';
import { Customer } from '../model/customer';

@Injectable({
  providedIn: 'root'
})
export class ApiFStoreService {

  constructor(private angularFirestore: AngularFirestore) { }
  addCustomer(customer: Customer) {
    return this.angularFirestore.collection('customers').add(customer);
  }
}
