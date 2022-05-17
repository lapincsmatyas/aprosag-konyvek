import { Component, OnInit } from '@angular/core';
import {ItemsService} from "../../../services/item/items.service";
import {Item} from "../../../model/item.model";
import {UserService} from "../../../services/user/user.service";

@Component({
  selector: 'aprosag-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  favorites: Item[] = [];

  constructor(
    private userService: UserService,
    private itemService: ItemsService) { }

  ngOnInit(): void {
    this.userService.user.subscribe((user) => {
      if (user) {
        this.favorites = this.itemService.getItemsByIds(user.favorites);
      }
    })
  }

}
