import {PaymentType, ShippingType} from "../../model/cart-item.model";

export interface Settings{
  shippingTypes: ShippingType[],
  paymentTypes: PaymentType[]
}
