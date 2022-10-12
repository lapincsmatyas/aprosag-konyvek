import { Injectable } from '@angular/core';
import { Observable, of } from "rxjs";
import * as itemsJson from "./items.json"
import {
  addDoc,
  collection,
  collectionData,
  doc,
  docData,
  Firestore,
  updateDoc,
  deleteDoc
} from "@angular/fire/firestore";
import { map } from "rxjs/operators";
import { Item } from "items";

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  itemsData: any = (itemsJson as any).default;

  constructor(private firestore: Firestore) {
  }

  getAllItems(): Observable<Item[]> {
    return collectionData(collection(this.firestore, 'items'), {idField: 'id'}).pipe(
      map((items) =>
        items.map((item) => {
            return {
              ...item,
              publication_date: item['publication_date'].toDate()
            } as Item;
          }
        )
      ))
  }

  getItemById(id: string): Observable<Item | undefined> {
    return docData(doc(this.firestore, `items/${id}`), {idField: 'id'}).pipe(
      map((item) => item as Item)
    )
  }

  createItem(item: Item) {
    return of(addDoc(collection(this.firestore, 'items'), item));
  }

  editItem(item: Item) {
    return of(updateDoc(doc(this.firestore, `items/${item.id}`), {...item}));
  }

  deleteItem(id: string) {
    return of(deleteDoc(doc(this.firestore, `items/${id}`)));
  }
}
