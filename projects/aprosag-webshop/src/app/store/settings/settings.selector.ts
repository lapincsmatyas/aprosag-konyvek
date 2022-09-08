import {createSelector} from "@ngrx/store";
import {getCoreState} from "../index";

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
