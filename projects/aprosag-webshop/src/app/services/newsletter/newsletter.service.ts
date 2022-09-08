import { Injectable } from '@angular/core';
import {CollectionReference} from "@firebase/firestore";
import {addDoc, collection, Firestore} from "@angular/fire/firestore";
import {Newsletter} from "../../model/newsletter.model";

@Injectable({
  providedIn: 'root'
})
export class NewsletterService {
  private collection: CollectionReference<Newsletter>;

  constructor(private fireStore: Firestore) {
    this.collection = collection(this.fireStore, 'newsletter');
  }

  subscribe(email: string) {
    return addDoc(this.collection, { emailAddress: email });
  }
}
