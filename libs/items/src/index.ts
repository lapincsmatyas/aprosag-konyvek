import {ActionReducerMap, createSelector} from "@ngrx/store";
import * as fromItem from "libs/items/src/lib/+state/items/items.reducer";
import * as fromCart from "./lib/+state/cart/cart.reducer";
import * as fromOrder from "./lib/+state/order/order.reducer";
import * as fromSettings from "./lib/+state/settings/settings.reducer";

export interface State {
  item: fromItem.ItemsState,
  cart: fromCart.State,
  order: fromOrder.State,
  settings: fromSettings.State
}

export const reducers: ActionReducerMap<State> = {
  item: fromItem.itemsReducer,
  cart: fromCart.reducer,
  order: fromOrder.reducer,
  settings: fromSettings.reducer
}


export * from './lib/+state/items/items.models';
export * from './lib/+state/items/items.facade'
