import {Item} from "./item.model";

export interface ShippingType {
  name: string,
  value: number
}

  export interface CartItem {
    item: Item;
    amount: number;
  }

