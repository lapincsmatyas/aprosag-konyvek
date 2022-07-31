import {ActionReducerMap, createFeatureSelector} from "@ngrx/store";
import * as fromItem from "./item/item.reducer";
import * as fromCart from "./cart/cart.reducer";
import * as fromOrder from "./order/order.reducer";

export interface State {
  item: fromItem.State,
  cart: fromCart.State,
  order: fromOrder.State
}

export const reducers: ActionReducerMap<State> = {
  item: fromItem.reducer,
  cart: fromCart.reducer,
  order: fromOrder.reducer
}

export const getCoreState = createFeatureSelector<State>('core');
