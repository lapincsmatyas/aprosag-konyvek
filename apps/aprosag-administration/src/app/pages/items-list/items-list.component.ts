import { Component, OnInit } from '@angular/core';
import {Item, ItemsFacade} from "items";
import {Observable} from "rxjs";

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.css'],
})
export class ItemsListComponent implements OnInit {
  public items$: Observable<Item[]> = this.itemsFacade.getItems$;

  constructor(private itemsFacade: ItemsFacade) {}

  ngOnInit(): void {
    this.itemsFacade.loadItems();
  }
}
