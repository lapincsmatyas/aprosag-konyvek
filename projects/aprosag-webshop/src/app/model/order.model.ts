import {User} from "./user.model";
import {Timestamp} from "@firebase/firestore";
import {CartItem} from "../store/cart/cart.model";
import {PaymentType, ShippingType} from "./cart-item.model";

export enum OrderState {
  SENT= "SENT"
}

export interface Order {
  orderId?: string;
  orderNumber?: number;
  user?: User;
  date?: Timestamp;
  state?: OrderState;
  cart?: CartItem[];
  price?: number;
  shippingType?: ShippingType;
  paymentType?: PaymentType;
}
