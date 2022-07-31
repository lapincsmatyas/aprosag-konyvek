import {createAction, props} from "@ngrx/store";
import {PaymentType, ShippingType} from "../../model/cart-item.model";
import {BillingAddress} from "../../model/billing-address.model";

export const changeShippingType = createAction(
  '[Order] Change Shipping Type',
  props<{ newShippingType: ShippingType }>()
)

export const changePaymentType = createAction(
  '[Order] Change Payment Type',
  props<{ newPaymentType: PaymentType }>()
)

export const setBillingAddress = createAction(
  '[Order] Set Billing Address',
  props<{ newBillingAddress: BillingAddress }>()
);
