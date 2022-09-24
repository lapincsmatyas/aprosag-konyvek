import {createReducer, on} from '@ngrx/store';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {CartItem} from './cart.model';
import * as CartActions from './cart.actions';

export interface State extends EntityState<CartItem> {
}

export const adapter: EntityAdapter<CartItem> = createEntityAdapter<CartItem>();

export const initialState: State = adapter.getInitialState({
});

export const reducer = createReducer(
  initialState,
  on(CartActions.addItemToCart, (state, action) => {
    const cartItem = state.entities[action.item.id];
    return cartItem ?
      adapter.updateOne({id: action.item.id, changes: {amount: action.amount + cartItem.amount}}, state) :
      adapter.addOne({id: action.item.id, item: action.item, amount: action.amount}, state)
  }),
  on(CartActions.changeItemAmount, (state, action) => {
    const cartItem = state.entities[action.item.id];
    return cartItem ?
      adapter.updateOne({id: action.item.id, changes: {amount: action.amount}}, state) :
      {...state}
  }),
  on(CartActions.deleteItemFromCart, (state, action) => adapter.removeOne(action.id, state)),
  on(CartActions.clearCart, (state) => adapter.removeAll(state))
);

export const {
  selectAll
} = adapter.getSelectors();
