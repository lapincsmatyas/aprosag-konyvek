import { Injectable } from '@angular/core';
import {Item} from "../model/item.model";
import {Observable} from "rxjs";
import {AngularFirestore} from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  constructor(private firestore: AngularFirestore) { }

  getAllItems(): Observable<Item[]>{
    return this.firestore.collection<Item>('items').valueChanges({idField: 'id'});
  }

  getItemById(itemId: string): Observable<Item | undefined>{
    return this.firestore.doc<Item>(`items/${itemId}`).valueChanges({idField: 'id'});
  }

  createItem(data: Item){
    return this.firestore.collection('items').add(data);
  }

  saveItem(id: string, data: Item) {
    return this.firestore.doc<Item>(`items/${id}`).update(data);
  }
}
