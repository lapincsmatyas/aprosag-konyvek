import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import * as itemsJson from "./items.json"
import {addDoc, collection, collectionData, doc, docData, Firestore, getDocs} from "@angular/fire/firestore";
import {ItemDto} from "../../model/dto/item.dto";
import {Item} from "items";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  itemsData: any = (itemsJson as any).default;

  constructor(private firestore: Firestore) {
    this.initializeItems();
  }

  getAllItems(): Observable<Item[]> {
    return collectionData(collection(this.firestore, 'items'), {idField: 'id'}).pipe(
      map((items) =>
        items.map((item) => {
            return item as Item;
          }
        )
      ))
  }

  getItemById(id: string): Observable<Item | undefined> {
    return docData(doc(this.firestore, `items/${id}`), {idField: 'id'}).pipe(
      map((item) => item as Item)
    )
  }

  initializeItems() {
    getDocs<ItemDto>(collection(this.firestore, `items`)).then((items) => {
      if (items.docs.length == 0) {
        this.itemsData.forEach((itemData: any) => {
          addDoc(collection(this.firestore, 'items'), itemData);
        });
      }
    });
  }
}
