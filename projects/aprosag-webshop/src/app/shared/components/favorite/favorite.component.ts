import {Component, Input, OnInit} from '@angular/core';
import {UserService} from "../../../services/user/user.service";
import {DeprecatedItem} from "../../../model/item.model";

@Component({
  selector: 'aprosag-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent implements OnInit{
  @Input()
  item: DeprecatedItem | null = null;

  isFavorite: boolean = false;

  constructor(public userService: UserService) {
  }

  ngOnInit() {
    this.userService.user.subscribe((user) => {
      this.isFavorite = !!user?.favorites?.includes(this.item?.id || "");
    })
  }


  addItemToFavourites($event: Event) {
    if(this.item) {
      $event.stopPropagation();
      this.userService.addOrRemoveItemAsFavorite(this.item);
    }
  }
}
