import {createReducer, on} from '@ngrx/store';
import {PaymentType, ShippingType} from "../../model/cart-item.model";
import {changePaymentType, changeShippingType} from "./order.action";

export interface State {
  selectedShippingType: ShippingType,
  selectedPaymentType: PaymentType
}

export const initialState: State = {
  selectedShippingType: ShippingType.PICKUP,
  selectedPaymentType: PaymentType.BANK_TRANSFER
}

export const reducer = createReducer(
  initialState,
  on(changeShippingType, (state, action) => ({...state, selectedShippingType: action.newShippingType})),
  on(changePaymentType, (state, action) => ({...state, selectedPaymentType: action.newPaymentType}))
);
