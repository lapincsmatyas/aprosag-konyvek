import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of} from "rxjs";
import {Item} from "../../model/item.model";
import * as itemsJson from "./items.json"
import {collection, Firestore, getDocs} from "@angular/fire/firestore";
import {ItemDto} from "../../model/dto/item.dto";
import {LoadingService} from "../loading/loading.service";


@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  itemsData: any = (itemsJson as any).default;

  public items: BehaviorSubject<Item[]> = new BehaviorSubject<Item[]>([]);

  constructor(private firestore: Firestore, private loadingService: LoadingService) {
    loadingService.addProcess('get-items');
    getDocs<ItemDto>(collection(firestore, `items`)).then((items) => {
      loadingService.removeProcess('get-items');
      this.items.next(items.docs.map((reference) => {
        let item = JSON.parse(JSON.stringify(reference.data()));
        return {
          ...item,
          id: reference.id
        };
      }));
    })
  }

  getItemById(id: string): Item | undefined {
    return this.items.value.find((item) => item.id === id);
  }

  getItemsByIds(ids: string[]): Item[] {
    if (ids.length === 0)
      return [];

    return this.items.value.filter((item) => ids?.includes(item.id || ""));
  }
}
