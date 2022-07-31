import {createAction, props} from "@ngrx/store";
import {PaymentType, ShippingType} from "../../model/cart-item.model";

export const changeShippingType = createAction(
  '[Order] Change Shipping Type',
  props<{ newShippingType: ShippingType }>()
)

export const changePaymentType = createAction(
  '[Order] Change Payment Type',
  props<{ newPaymentType: PaymentType }>()
)
