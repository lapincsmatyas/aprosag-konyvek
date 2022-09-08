import {PaymentType, ShippingType} from "../../model/cart-item.model";
import {createReducer, on} from "@ngrx/store";
import {loadSettings} from "./settings.action";
import {SliderImage} from "../../shared/components/gallery/gallery.component";

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
