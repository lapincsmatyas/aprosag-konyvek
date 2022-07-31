import {createSelector} from "@ngrx/store";
import {getCoreState} from "../index";

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
