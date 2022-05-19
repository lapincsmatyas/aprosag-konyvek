import { Component } from '@angular/core';
import {ItemsService} from "../../services/item/items.service";
import {Item} from "../../model/item.model";

@Component({
  selector: 'aprosag-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent{
  public items: Item[] = [];

  constructor(public itemsService: ItemsService) {
    itemsService.items.subscribe((items) => {
      this.items = items;
    })
  }
}
