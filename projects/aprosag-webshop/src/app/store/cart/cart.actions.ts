import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { CartItem } from './cart.model';

export const loadCarts = createAction(
  '[Cart/API] Load Carts',
  props<{ carts: CartItem[] }>()
);

export const addCart = createAction(
  '[Cart/API] Add Cart',
  props<{ cartItem: CartItem }>()
);

export const upsertCart = createAction(
  '[Cart/API] Upsert Cart',
  props<{ cartItem: CartItem }>()
);

export const addCarts = createAction(
  '[Cart/API] Add Carts',
  props<{ carts: CartItem[] }>()
);

export const upsertCarts = createAction(
  '[Cart/API] Upsert Carts',
  props<{ carts: CartItem[] }>()
);

export const updateCart = createAction(
  '[Cart/API] Update Cart',
  props<{ cart: Update<CartItem> }>()
);

export const updateCarts = createAction(
  '[Cart/API] Update Carts',
  props<{ carts: Update<CartItem>[] }>()
);

export const deleteCart = createAction(
  '[Cart/API] Delete Cart',
  props<{ id: string }>()
);

export const deleteCarts = createAction(
  '[Cart/API] Delete Carts',
  props<{ ids: string[] }>()
);

export const clearCarts = createAction(
  '[Cart/API] Clear Carts'
);
