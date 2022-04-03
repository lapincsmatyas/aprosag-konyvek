import { Component } from '@angular/core';
import {CartService} from "../../services/cart/cart.service";
import {ImageCacheService} from "../../services/image-cache/image-cache.service";
import {CartItem} from "../../model/cart-item.model";
import {Router} from "@angular/router";

import {faTimesCircle} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'aprosag-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent  {
  faTimesCircle = faTimesCircle;

  constructor(public cartService: CartService, public imageCache: ImageCacheService, private router: Router) { }

  removeItemFromCart(item: CartItem) {
    this.cartService.removeAllOfTypeFromCart(item);
  }


  goToDesk() {
    this.router.navigateByUrl("cash-desk");
  }

  amountChanged(newValue: number, item: CartItem) {
    item.amount = newValue;
  }

  continueShopping() {
    this.router.navigateByUrl("items");
  }
}
