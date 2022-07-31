import {ActionReducerMap, createFeatureSelector} from "@ngrx/store";
import * as fromItem from "./item/item.reducer";
import * as fromCart from "./cart/cart.reducer";
import * as fromOrder from "./order/order.reducer";
import * as fromSettings from "./settings/settings.reducer";

export interface State {
  item: fromItem.State,
  cart: fromCart.State,
  order: fromOrder.State,
  settings: fromSettings.State
}

export const reducers: ActionReducerMap<State> = {
  item: fromItem.reducer,
  cart: fromCart.reducer,
  order: fromOrder.reducer,
  settings: fromSettings.reducer
}

export const getCoreState = createFeatureSelector<State>('core');
