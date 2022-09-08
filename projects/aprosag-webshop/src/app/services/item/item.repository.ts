import {Injectable} from '@angular/core';
import {ItemsService} from "./items.service";
import {Store} from "@ngrx/store";
import {loadItemByHttp, loadItemsByHttp} from "../../store/item/item.actions";
import {Item} from "../../store/item/item.model";
import {Observable, of} from "rxjs";
import {getAllItems, getItemById, getItemsById, itemsLoaded} from "../../store/item/item.selector";

@Injectable({
  providedIn: 'root'
})
export class ItemRepository {
  constructor(private itemService: ItemsService,
              private store: Store<any>) {
  }

  loadItems(){
    this.store.dispatch(loadItemsByHttp());
  }

  getItemsLoaded$(): Observable<boolean>{
    return this.store.select(itemsLoaded);
  }

  loadItemById(id: string) {
    this.store.dispatch(loadItemByHttp({id}));
  }

  getItems$(): Observable<Item[]>{
    return this.store.select(getAllItems);
  }

  getItemById$(id: string): Observable<Item | undefined>{
    return this.store.select(getItemById(id))
  }

  getItemsById$(ids: string[]): Observable<Item[]>{
    return this.store.select(getItemsById(ids)) || of([]);
  }
}
