import {ActionReducerMap, createFeatureSelector} from "@ngrx/store";
import * as fromItem from "./item/item.reducer";
import * as fromCart from "./cart/cart.reducer";

export interface State {
  item: fromItem.State,
  cart: fromCart.State
}

export const reducers: ActionReducerMap<State> = {
  item: fromItem.reducer,
  cart: fromCart.reducer
}

export const getCoreState = createFeatureSelector<State>('core');
