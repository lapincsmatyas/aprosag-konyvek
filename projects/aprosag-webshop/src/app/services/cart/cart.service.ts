import {Injectable} from '@angular/core';
import {UserService} from "../user/user.service";
import {AuthService} from "../auth/auth.service";
import {CartItem, ShippingType} from "../../model/cart-item.model";
import {Item} from "../../model/item.model";

const CART_KEY = 'aprosag_cart';

const shippingTypes: ShippingType[] = [
  {name: "Házhozszállítás GLS-sel", value: 1490},
  {name: "Foxspost csomagautomata", value: 700},
  {name: "Személyes átvétel Mosonmagyaróváron", value: 0}
]

@Injectable({
  providedIn: 'root'
})
export class CartService {


  private cart: Map<string, CartItem>;

  public shippingTypes: ShippingType[] = [];

  public selectedShippingType: ShippingType | null;

  get items(): CartItem[] {
    return Array.from(this.cart.values());
  }

  get valid(): boolean {
    return this.selectedShippingType != null && this.count > 0;
  }

  get count(): number {
    if (!this.cart) return 0;

    let count = 0;
    for (let [key, value] of this.cart) {
      count += value.amount;
    }
    return count;
  }

  get value(): number {
    return Array.from(this.cart.values()).reduce((previousPrice, item) => {
      let actualPrice = item?.item?.price ? (item.amount * item.item.price) : 0;
      return actualPrice  + previousPrice;
    }, 0)
  }

  constructor(private userService: UserService, private authService: AuthService) {

    if (localStorage.getItem(CART_KEY))
      this.cart = new Map(JSON.parse(localStorage.getItem(CART_KEY) || ""));
    else
      this.cart = new Map<string, CartItem>();

    this.shippingTypes = shippingTypes;
    this.selectedShippingType = null;

    this.userService.user.subscribe((user) => {
      if(user){
        if(this.cart.size > 0){
          this.initCart(Array.from(this.cart.values()))
          this.updateUserCart();
        } else {
          this.initCart(user.cart);
        }
      }
    })

  }

  initCart(cartItems: CartItem[] = []){
    cartItems.forEach((cartItem) => {
      this.cart.set(cartItem.item.id, cartItem);
    })
  }

  addItemToCart(item: Item, amount: number): CartItem {
    const cartItem = this.cart.get(item.id);

    let updatedCartItem = cartItem === undefined ?
      {item, amount} :
      {item, amount: cartItem.amount + amount};

    this.cart.set(item.id, updatedCartItem);

    this.updateStorage();
    this.updateUserCart();

    return updatedCartItem
  }

  removeAllOfTypeFromCart(item: CartItem) {
    const id = item.item.id;
    if (!id)
      return;

    let cartItem = this.cart.get(id)

    if (!cartItem)
      return;

    this.cart.delete(id);

    this.updateStorage();
    this.updateUserCart();
  }

  removeItemCart(item: CartItem): CartItem | null {
    let cartItem = this.cart.get(item.item.id);
    if (cartItem === undefined)
      return null;

    cartItem.amount = cartItem.amount - 1;
    if (cartItem.amount == 0) {
      this.cart.delete(item.item.id);
    } else {
      this.cart.set(item.item.id, cartItem);
    }

    this.updateStorage();
    this.updateUserCart();

    return cartItem;
  }

  emptyCart() {
    this.cart.clear();
    this.updateStorage();
  }

  updateStorage() {
    localStorage.setItem(CART_KEY, JSON.stringify(Array.from(this.cart.entries())));
  }

  updateUserCart(){
    if(this.userService.user.value) {
      const cartItems: CartItem[] = Array.from(this.cart.values());
      this.userService.updateCart(cartItems);
    }
  }
}
