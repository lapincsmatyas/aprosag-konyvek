import { Component, OnInit } from '@angular/core';
import {ItemsService} from "../../services/item/items.service";
import {Observable} from "rxjs";
import {DeprecatedItem} from "../../model/item.model";
import {ActivatedRoute} from "@angular/router";
import {ItemRepository} from "../../services/item/item.repository";
import {Item} from "../../store/item/item.model";

@Component({
  selector: 'aprosag-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit{

  public items$: Observable<Item[]> = this.itemRepository.getItems$();

  constructor(private itemRepository: ItemRepository) {
  }

  ngOnInit() {
  }
}
