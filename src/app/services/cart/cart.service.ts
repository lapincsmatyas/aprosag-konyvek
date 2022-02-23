import {Injectable} from '@angular/core';
import {CartItem} from "../../model/cart-item.model";
import {Item} from "../../model/item.model";

const CART_KEY = 'aprosag_cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: Map<string, CartItem>;

  get items(): CartItem[] {
    return Array.from(this.cart.values());
  }

  get count(): number {
    if(!this.cart) return 0;

    let count = 0;
    for (let [key, value] of this.cart) {
      count += value.amount;
    }
    return count;
  }

  constructor() {
    console.log(localStorage.getItem(CART_KEY));

    if(localStorage.getItem(CART_KEY))
      this.cart = new Map(JSON.parse(localStorage.getItem(CART_KEY) || ""));
    else
      this.cart = new Map<string, CartItem>();

    console.log(this.cart);
  }

  addItemToCart(item: Item, amount: number) {
    const id = item.id;

    console.log(id);

    if(!id)
      return;

    let cartItem = this.cart.get(id);

    if (cartItem != undefined) {
      this.cart.set(id, {item: item, amount: cartItem.amount + amount});
    } else if (amount > 0) {
      this.cart.set(id, {item: item, amount: amount});
    }

    this.updateStorage();
  }

  removeItemCart(item: Item) {
    const id = item.id;
    if(!id)
      return;

    let cartItem = this.cart.get(id)

    if (!cartItem)
      return;

    if (cartItem.amount == 1)
      this.cart.delete(id);

    this.cart.set(id, {item: item, amount: cartItem.amount - 1});

    this.updateStorage();
  }

  emptyCart() {
    this.cart.clear();

    this.updateStorage();
  }

  updateStorage(){
    console.log(this.cart);
    localStorage.setItem(CART_KEY, JSON.stringify(Array.from(this.cart.entries())));
  }
}
