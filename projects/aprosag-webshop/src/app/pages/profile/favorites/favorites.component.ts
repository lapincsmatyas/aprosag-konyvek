import { Component, OnInit } from '@angular/core';
import {ItemsService} from "../../../services/item/items.service";
import {DeprecatedItem} from "../../../model/item.model";
import {UserService} from "../../../services/user/user.service";
import {ItemRepository} from "../../../services/item/item.repository";
import {Observable, of} from "rxjs";
import {Item} from "../../../store/item/item.model";

@Component({
  selector: 'aprosag-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  favorites$: Observable<Item[]> = of([]);

  constructor(
    private userService: UserService,
    private itemRepository: ItemRepository) { }

  ngOnInit(): void {
    this.userService.user.subscribe((user) => {
      if (user) {
        this.favorites$ = this.itemRepository.getItemsById$(user.favorites);
      }
    })
  }

}
