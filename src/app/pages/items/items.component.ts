import { Component, OnInit } from '@angular/core';
import {ItemsService} from "../../services/item/items.service";
import {Observable} from "rxjs";
import {Item} from "../../model/item.model";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'aprosag-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent {
  public items$: Observable<Item[]>

  constructor(private itemsService: ItemsService) {
    this.items$ = itemsService.getAllItems();
  }

}
