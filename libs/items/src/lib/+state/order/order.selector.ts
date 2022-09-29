import {createSelector} from "@ngrx/store";
import {getCoreState} from "items";

const selectOrderState = createSelector(
  getCoreState,
  state => state.order
);

export const getSelectedShippingType = createSelector(
  selectOrderState,
  state => state.selectedShippingType
);

export const getSelectedPaymentType = createSelector(
  selectOrderState,
  state => state.selectedPaymentType
);

export const getBillingAddress = createSelector(
  selectOrderState,
  state => state.billingAddress
);
