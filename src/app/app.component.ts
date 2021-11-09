import { Component } from '@angular/core';
import {ItemsService} from "./services/items.service";

@Component({
  selector: 'aprosag-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private itemsService: ItemsService) {
    itemsService.initializeItems();
  }
}
