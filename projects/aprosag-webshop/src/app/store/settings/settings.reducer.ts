import {PaymentType, ShippingType} from "../../model/cart-item.model";
import {createReducer, on} from "@ngrx/store";
import {loadSettings} from "./settings.action";

export interface State {
  shippingTypes: ShippingType[],
  paymentTypes: PaymentType[],
}

export const initialState: State = {
  shippingTypes: [],
  paymentTypes: []
}

export const reducer = createReducer(
  initialState,
  on(loadSettings, (state, {settings}) => ({...state, ...settings}))
);
