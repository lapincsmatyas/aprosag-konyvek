import { Injectable } from '@angular/core';
import { UserService } from "../user/user.service";
import { AuthService } from "../auth/auth.service";
import { Item } from "items";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import {
  selectAllCartItems,
  selectCount,
  selectSumPrice
} from "../../../../../../libs/items/src/lib/+state/cart/cart.selector";
import { CartItem } from "../../../../../../libs/items/src/lib/+state/cart/cart.model";
import {
  addItemToCart,
  changeItemAmount,
  clearCart,
  deleteItemFromCart
} from "../../../../../../libs/items/src/lib/+state/cart/cart.actions";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  count$: Observable<number> = this.store.select(selectCount);
  items$: Observable<CartItem[]> = this.store.select(selectAllCartItems);
  sumPrice$: Observable<number> = this.store.select(selectSumPrice);

  constructor(private userService: UserService,
              private authService: AuthService,
              private store: Store<any>
  ) {
  }

  addItemToCart(item: Item, amount: number): void {
    this.store.dispatch(addItemToCart({item: item, amount: amount}));
  }

  removeItemFromCart(item: Item): void {
    if(!item.id) return;
    this.store.dispatch(deleteItemFromCart({id: item.id}));
  }

  changeItemAmount(item: Item, amount: number): void {
    this.store.dispatch(changeItemAmount({item: item, amount: amount}));
  }

  clearCart(): void {
    this.store.dispatch(clearCart());
  }
}
