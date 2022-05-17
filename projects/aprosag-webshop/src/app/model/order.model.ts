import {User} from "./user.model";
import {CartItem, ShippingType} from "./cart-item.model";
import {Timestamp} from "@firebase/firestore";

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

export interface PaymentType {
  name: string;
  description: string;
}
