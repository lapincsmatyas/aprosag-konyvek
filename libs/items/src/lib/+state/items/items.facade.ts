import { ItemsState } from './items.reducer';
import {Injectable} from '@angular/core';
import {Store} from "@ngrx/store";
import {Item} from "./items.models";
import {Observable} from "rxjs";
import {loadItemByHttp, loadItemsByHttp} from "./items.actions";
import {selectAllItems, selectItemById, selectItemsLoaded} from "./items.selectors";

@Injectable({
  providedIn: 'root'
})
export class ItemsFacade {
  getItemsLoaded$ = this.store.select(selectItemsLoaded);
  getItems$ = this.store.select(selectAllItems);

  constructor(private store: Store<any>) {
  }

  loadItems(){
    this.store.dispatch(loadItemsByHttp());
  }

  loadItemById(id: string) {
    this.store.dispatch(loadItemByHttp({id}));
  }

  getItemById$(id: string): Observable<Item | undefined>{
    return this.store.select(selectItemById(id))
  }
}
