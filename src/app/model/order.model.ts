import {User} from "./user.model";
import {CartItem} from "./cart-item.model";

export enum OrderState {
  SENT= "SENT"
}

export interface Order {
  user: User;
  date: Date;
  state: OrderState;
  cart: CartItem[];
}
