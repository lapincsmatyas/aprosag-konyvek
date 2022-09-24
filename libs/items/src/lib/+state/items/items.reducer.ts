import {Action, createReducer, on} from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Item } from './items.models';
import * as ItemActions from './items.actions';

export interface ItemsState extends EntityState<Item> {
  itemsLoaded: boolean;
}

export const itemsAdapter: EntityAdapter<Item> =
  createEntityAdapter<Item>();

export const initialItemsState: ItemsState = itemsAdapter.getInitialState({
  itemsLoaded: false
});

const reducer = createReducer(
  initialItemsState,
  on(ItemActions.addItem,
    (state, action) => itemsAdapter.addOne(action.item, state)
  ),
  on(ItemActions.upsertItem,
    (state, action) => itemsAdapter.upsertOne(action.item, state)
  ),
  on(ItemActions.addItems,
    (state, action) => itemsAdapter.addMany(action.items, state)
  ),
  on(ItemActions.upsertItems,
    (state, action) => itemsAdapter.upsertMany(action.items, state)
  ),
  on(ItemActions.updateItem,
    (state, action) => itemsAdapter.updateOne(action.item, state)
  ),
  on(ItemActions.updateItems,
    (state, action) => itemsAdapter.updateMany(action.items, state)
  ),
  on(ItemActions.deleteItem,
    (state, action) => itemsAdapter.removeOne(action.id, state)
  ),
  on(ItemActions.deleteItems,
    (state, action) => itemsAdapter.removeMany(action.ids, state)
  ),
  on(ItemActions.loadItems,
    (state, action) => {
      return {
        ...itemsAdapter.setAll(action.items, state),
        itemsLoaded: true
      }
    }
  ),
  on(ItemActions.clearItems,
    state => itemsAdapter.removeAll(state)
  ),
);

export function itemsReducer(state: ItemsState | undefined, action: Action) {
  return reducer(state, action);
}
