import {Injectable} from '@angular/core';
import {Store} from "@ngrx/store";
import {Item} from "data";
import {Observable, of} from "rxjs";
import {loadItemByHttp, loadItemsByHttp} from "./items.actions";
import {ItemsState} from "./items.reducer";
import {getAllItems, getItemById, getItemsLoaded} from "./items.selectors";

@Injectable({
  providedIn: 'root'
})
export class ItemsFacade {
  constructor(private store: Store<any>) {
  }

  loadItems(){
    this.store.dispatch(loadItemsByHttp());
  }

  getItemsLoaded$(): Observable<boolean>{
    return this.store.select(getItemsLoaded);
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

}
