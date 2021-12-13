import {User} from "./user.model";
import {CartItem, ShippingType} from "./cart-item.model";

export enum OrderState {
  SENT= "SENT"
}

export interface Order {
  user?: User;
  date?: Date;
  state?: OrderState;
  cart?: CartItem[];
  shippingType?: ShippingType;
  paymentType?: PaymentType;
}

export interface PaymentType {
  name: string;
  description: string;
}
