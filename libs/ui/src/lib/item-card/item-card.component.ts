import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {Item} from "data";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'aprosag-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule
  ]
})
export class ItemCardComponent {
  @Input() item: Item;
  @Output() addItemToCartClicked = new EventEmitter<Item>();
  @Output() itemClicked = new EventEmitter<Item>();

  constructor() {
  }
}
