import { createAction, props } from '@ngrx/store';
import {Item} from "../items/items.models";

export const addItemToCart = createAction(
  '[Cart/API] Change Cart Item Amount',
  props<{ item: Item, amount: number }>()
);

export const changeItemAmount = createAction(
  '[Cart/API] Change Cart Item Amount',
  props<{ item: Item, amount: number }>()
);

export const deleteItemFromCart = createAction(
  '[Cart/API] Delete Item From Cart',
  props<{ id: string }>()
);

export const clearCart = createAction(
  '[Cart/API] Clear Cart'
);
