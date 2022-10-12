import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ItemsFacade } from 'items';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemListComponent {
  constructor( readonly itemsFacade: ItemsFacade) {}
}
