import {Injectable} from '@angular/core';
import {addDoc, collection, collectionData, Firestore} from "@angular/fire/firestore";
import {getDownloadURL, ref, Storage} from "@angular/fire/storage";
import {from, Observable} from "rxjs";
import {Item} from "../model/item.model";
import {CollectionReference} from "@firebase/firestore";
import {map, mergeMap, take, toArray} from "rxjs/operators";
import * as itemsJson from "./items.json"

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  items: any = (itemsJson as any).default;

  private collection: CollectionReference;

  constructor(private fireStore: Firestore, private fireStorage: Storage) {
    this.collection = collection(fireStore, 'items');
  }

  initializeItems() {
    let temp = collectionData(this.collection).subscribe(result => {
      if (result.length == 0) {
        for (let i = 0; i < this.items.length * 4; i++) {
          addDoc(this.collection, this.items[i % this.items.length]);
        }
        temp.unsubscribe();
      }
    });
  }

  getAllItems(): Observable<Item[]> {
    return collectionData(this.collection).pipe(
      take(1),
      mergeMap((items: Item[]) => from(items)),
      map(item => {
        item.image_urls = item.image_urls?.map(async (url) => {
          return await getDownloadURL(ref(this.fireStorage, url));
        });
        return item;
      }),
      toArray()
    );
  }
}
