import {Injectable} from '@angular/core';
import {CartItem, ShippingType} from "../../model/cart-item.model";
import {Item} from "../../model/item.model";

const CART_KEY = 'aprosag_cart';

const shippingTypes : ShippingType[] = [
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

  get valid() : boolean{
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
    let sum = 0;
    Array.from(this.cart.values()).forEach((item) => {
      if (item?.item?.price)
        sum += item.amount * item.item.price;
    })
    return sum;
  }

  constructor() {

    if (localStorage.getItem(CART_KEY))
      this.cart = new Map(JSON.parse(localStorage.getItem(CART_KEY) || ""));
    else
      this.cart = new Map<string, CartItem>();

    this.shippingTypes = shippingTypes;
    this.selectedShippingType = null;
  }

  addItemToCart(item: Item, amount: number) {
    const id = item.id;

    console.log(id);

    if (!id)
      return;

    let cartItem = this.cart.get(id);

    if (cartItem != undefined) {
      this.cart.set(id, {item: item, amount: cartItem.amount + amount});
    } else if (amount > 0) {
      this.cart.set(id, {item: item, amount: amount});
    }

    this.updateStorage();
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
  }

  removeItemCart(item: CartItem) {
    const id = item.item.id;
    if (!id)
      return;

    let cartItem = this.cart.get(id)

    if (!cartItem)
      return;

    if (cartItem.amount == 1)
      this.cart.delete(id);

    this.cart.set(id, {item: item.item, amount: cartItem.amount - 1});

    this.updateStorage();
  }

  emptyCart() {
    this.cart.clear();

    this.updateStorage();
  }

  updateStorage() {
    console.log(this.cart);
    localStorage.setItem(CART_KEY, JSON.stringify(Array.from(this.cart.entries())));
  }
}
