import {Injectable} from '@angular/core';
import {CartItem} from "../../model/cart-item.model";
import {Item} from "../../model/item.model";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart: Map<Item, number> = new Map<Item, number>();

  constructor() {
  }

  addItemToCart(item: Item, amount = 0) {
    let cartItem = this.cart.get(item) || amount;
    this.cart.set(item, cartItem + 1);
  }

  removeItemCart(item: Item) {
    let cartItem = this.cart.get(item)

    if(!cartItem)
      return;

    if(cartItem == 1)
      this.cart.delete(item);

    this.cart.set(item, cartItem - 1);
  }

  emptyCart(){
    this.cart.clear();
  }
}
