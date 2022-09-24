import {createAction, props} from "@ngrx/store";
import {PaymentType, ShippingType} from "../../../../../../apps/aprosag-konyvek/src/app/model/cart-item.model";
import {BillingAddress} from "../../../../../../apps/aprosag-konyvek/src/app/model/billing-address.model";

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
