import {Injectable} from '@angular/core';
import {addDoc, collection, collectionData, doc, docData, Firestore, getDoc} from "@angular/fire/firestore";
import {Storage} from "@angular/fire/storage";
import {Observable, of} from "rxjs";
import {Item} from "../../model/item.model";
import {CollectionReference} from "@firebase/firestore";
import * as itemsJson from "./items.json"
import {delay, map, take} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  itemsData: any = (itemsJson as any).default;
  private collection: CollectionReference<Item>;

  private items: Item[] | null = null;

  constructor(private fireStore: Firestore, private fireStorage: Storage) {
    this.collection = collection(this.fireStore, 'items');
    //this.initializeItems();
  }

  initializeItems() {
    let temp = collectionData(this.collection).subscribe(result => {
      if (result.length == 0) {
        for (let i = 0; i < this.itemsData.length * 4; i++) {
          addDoc(this.collection, this.itemsData[i % this.itemsData.length]);
        }
        temp.unsubscribe();
      }
    });
  }

  getAllItems(): Observable<Item[]> {
    if(this.items) {
      return of(this.items);
    } else {
      return collectionData(this.collection, {idField: 'id'}).pipe(
        delay(1000),
        map(result => {
          this.items = result;
          return result;
        })
      );
    }
  };

  getItemById(id: string): Observable<Item> {
    const document = doc(this.collection, id);
    return docData(document, {idField: 'id'}).pipe(
      take(1)
    );
  }
}
