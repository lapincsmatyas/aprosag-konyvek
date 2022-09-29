import {User} from "./user.model";
import {Timestamp} from "@firebase/firestore";
import {PaymentType, ShippingType} from "data";
import { CartItem } from "libs/items/src/lib/+state/cart/cart.model";

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
