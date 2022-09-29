import {createSelector} from "@ngrx/store";
import {selectAll} from "./cart.reducer";
import {getCoreState} from "items";

const selectCartState = createSelector(
  getCoreState,
  state => state.cart
);

export const selectAllCartItems = createSelector(
  selectCartState,
  selectAll
);

export const selectCount = createSelector(
  selectCartState,
  state => {
    return selectAll(state).reduce((acc, item) => acc + item.amount, 0);
  }
);

export const selectSumPrice = createSelector(
  selectCartState,
  state => {
    return selectAll(state).reduce((acc, item) => acc + ((item.item.price.discount_price || item.item.price.price) * item.amount), 0);
  }
);
