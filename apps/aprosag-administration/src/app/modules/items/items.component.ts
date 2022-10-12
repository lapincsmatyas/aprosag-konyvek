import { Component, OnInit } from '@angular/core';
import { ItemsFacade } from 'items';

@Component({
  selector: 'app-items',
  template: '<router-outlet></router-outlet>',
})
export class ItemsComponent implements OnInit {
  constructor(private itemsFacade: ItemsFacade) {}

  ngOnInit(): void {
    this.itemsFacade.loadItems();
  }
}