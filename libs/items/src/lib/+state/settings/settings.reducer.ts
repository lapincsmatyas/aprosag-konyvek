import {createReducer, on} from "@ngrx/store";
import {loadSettings} from "./settings.action";
import {PaymentType, ShippingType, SliderImage} from "data";

export interface State {
  shippingTypes: ShippingType[],
  paymentTypes: PaymentType[],
  sliderImages: SliderImage[],
}

export const initialState: State = {
  shippingTypes: [],
  paymentTypes: [],
  sliderImages: []
}

export const reducer = createReducer(
  initialState,
  on(loadSettings, (state, {settings}) => ({...state, ...settings}))
);
