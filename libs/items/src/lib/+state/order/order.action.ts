import {createAction, props} from "@ngrx/store";
import {BillingAddress, PaymentType, ShippingType} from "data";

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
