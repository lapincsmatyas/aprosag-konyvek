import {Component, OnDestroy, OnInit} from '@angular/core';
import {Item} from "../../model/item.model";
import {ItemsService} from "../../services/items.service";
import {take, takeUntil} from "rxjs/operators";
import {ActivatedRoute, Router} from "@angular/router";
import {Subject} from "rxjs";

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnDestroy {
  destroy = new Subject()

  items: Item[] = [];

  selectedItem: Item | null = null;

  constructor(private itemService: ItemsService, private router: Router, private route: ActivatedRoute) {
    this.itemService.getAllItems().pipe(takeUntil(this.destroy)).subscribe(result => {
      this.items = result;
    });
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  selectItem(item: Item) {
    this.selectedItem = item;
  }

  saveItem(item: Item) {
    if(item.id){
      this.itemService.saveItem(item.id, item).then((result) => {
        this.selectedItem = null;
        alert('Sikeres mentés');
      }).catch((error) => alert('Sikertelen mentés' + error));
    } else {
      this.itemService.createItem(item).then((result) => {
        this.selectedItem = null;
        alert('Sikeres létrehozás');
      }).catch((error) => alert('Sikertelen létrehozás' + error));
    }

  }

  creatItem() {
    this.selectedItem = new Item();
  }
}
