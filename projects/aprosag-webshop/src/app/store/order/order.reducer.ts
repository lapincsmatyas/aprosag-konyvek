import {createReducer, on} from '@ngrx/store';
import {PaymentType, ShippingType} from "../../model/cart-item.model";
import {changePaymentType, changeShippingType, setBillingAddress} from "./order.action";
import {BillingAddress} from "../../model/billing-address.model";

export interface State {
  selectedShippingType: ShippingType | null,
  selectedPaymentType: PaymentType | null,
  billingAddress: BillingAddress | null,
}

export const initialState: State = {
  selectedShippingType: null,
  selectedPaymentType: null,
  billingAddress: null
}

export const reducer = createReducer(
  initialState,
  on(changeShippingType, (state, action) => ({...state, selectedShippingType: action.newShippingType})),
  on(changePaymentType, (state, action) => ({...state, selectedPaymentType: action.newPaymentType})),
  on(setBillingAddress, (state, action) => ({...state, billingAddress: action.newBillingAddress}))
);
