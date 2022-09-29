import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../services/user/user.service";
import {Observable, of} from "rxjs";
import {Item} from "items";
import {ItemsFacade} from "../../../../../../../libs/items/src/lib/+state/items/items.facade";

@Component({
  selector: 'aprosag-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  favorites$: Observable<Item[]> = of([]);

  constructor(
    private userService: UserService,
    private itemsFacade: ItemsFacade) { }

  ngOnInit(): void {
    this.userService.user.subscribe((user) => {
      if (user) {
        //this.favorites$ = this.itemsFacade.getItemsById$(user.favorites);
      }
    })
  }

}
