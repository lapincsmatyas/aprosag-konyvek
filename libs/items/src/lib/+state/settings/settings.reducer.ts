import {createReducer, on} from "@ngrx/store";
import {loadSettings} from "./settings.action";
import {SliderImage} from "../../../../../../apps/aprosag-konyvek/src/app/shared/components/gallery/gallery.component";
import {PaymentType, ShippingType} from "../../../../../../apps/aprosag-konyvek/src/app/model/cart-item.model";

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
