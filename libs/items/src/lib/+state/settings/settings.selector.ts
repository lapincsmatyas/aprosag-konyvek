import {createSelector} from "@ngrx/store";
import {getCoreState} from "items";

const selectSettingsState = createSelector(
  getCoreState,
  state => state.settings
);

export const getShippingTypes = createSelector(
  selectSettingsState,
  state => state.shippingTypes
);

export const getPaymentTypes = createSelector(
  selectSettingsState,
  state => state.paymentTypes
)

export const getSliderImages = createSelector(
  selectSettingsState,
  state => state.sliderImages
)
