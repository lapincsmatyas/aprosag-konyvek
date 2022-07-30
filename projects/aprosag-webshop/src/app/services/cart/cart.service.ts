import {Injectable} from '@angular/core';
import {ShippingType} from "../../model/cart-item.model";
import {UserService} from "../user/user.service";
import {AuthService} from "../auth/auth.service";
import {Item} from "../../store/item/item.model";
import {Store} from "@ngrx/store";
import {addItemToCart, changeItemAmount, clearCart, deleteItemFromCart} from "../../store/cart/cart.actions";
import {Observable} from "rxjs";
import {CartItem} from "../../store/cart/cart.model";
import {selectAll} from "../../store/cart/cart.reducer";
import {selectAllCartItems, selectCount, selectSumPrice} from "../../store/cart/cart.selector";

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
    this.store.dispatch(deleteItemFromCart({id: item.id}));
  }

  changeItemAmount(item: Item, amount: number): void {
    this.store.dispatch(changeItemAmount({item: item, amount: amount}));
  }

  clearCart(): void {
    this.store.dispatch(clearCart());
  }
}
