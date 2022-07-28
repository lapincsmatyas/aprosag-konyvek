import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { CartItem } from './cart.model';
import * as CartActions from './cart.actions';

export const cartsFeatureKey = 'carts';

export interface State extends EntityState<CartItem> {
  // additional entities state properties
}

export const adapter: EntityAdapter<CartItem> = createEntityAdapter<CartItem>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});

export const reducer = createReducer(
  initialState,
  on(CartActions.addCart,
    (state, action) => adapter.addOne(action.cart, state)
  ),
  on(CartActions.upsertCart,
    (state, action) => adapter.upsertOne(action.cart, state)
  ),
  on(CartActions.addCarts,
    (state, action) => adapter.addMany(action.carts, state)
  ),
  on(CartActions.upsertCarts,
    (state, action) => adapter.upsertMany(action.carts, state)
  ),
  on(CartActions.updateCart,
    (state, action) => adapter.updateOne(action.cart, state)
  ),
  on(CartActions.updateCarts,
    (state, action) => adapter.updateMany(action.carts, state)
  ),
  on(CartActions.deleteCart,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(CartActions.deleteCarts,
    (state, action) => adapter.removeMany(action.ids, state)
  ),
  on(CartActions.loadCarts,
    (state, action) => adapter.setAll(action.carts, state)
  ),
  on(CartActions.clearCarts,
    state => adapter.removeAll(state)
  ),
);

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
