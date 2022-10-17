import { Injectable } from '@angular/core';
import { Store } from "@ngrx/store";
import { Item } from "./items.models";
import { Observable } from "rxjs";
import { loadItemByHttp, loadItemsByHttp, createItem, deleteItem, editItem } from "./items.actions";
import { selectAllItems, selectItemById, selectItemsLoaded, selectItemDeleted, selectItemCreated, selectItemEdited } from "./items.selectors";

@Injectable({
  providedIn: 'root'
})
export class ItemsFacade {
  getItemsLoaded$ = this.store.select(selectItemsLoaded);
  getItems$ = this.store.select(selectAllItems);
  itemDeleted$ = this.store.select(selectItemDeleted);
  itemCreated$ = this.store.select(selectItemCreated);
  itemEdited$ = this.store.select(selectItemEdited);

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

  createItem(item: Item){
    this.store.dispatch(createItem({item}));
  }

  deleteItem(id: string){
    this.store.dispatch(deleteItem({id}));
  }

  editItem(item: Item){
    debugger
    this.store.dispatch(editItem({item}));
  }
}
