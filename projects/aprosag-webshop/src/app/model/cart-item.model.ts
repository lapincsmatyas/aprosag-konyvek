import {DeprecatedItem} from "./item.model";

export interface ShippingType {
  name: string,
  value: number
}

  export interface DeprecatedCartItem {
    item: DeprecatedItem;
    amount: number;
  }

