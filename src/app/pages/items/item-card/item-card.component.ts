import {Component, Input, OnInit} from '@angular/core';
import {Item} from "../../../model/item.model";

@Component({
  selector: 'aprosag-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss']
})
export class ItemCardComponent {
  @Input()
  public item: Item;

  constructor() {
    this.item = {};
  }
}
