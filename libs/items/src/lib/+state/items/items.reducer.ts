import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Item } from 'items';
import * as ItemActions from './items.actions';

export interface ItemsState extends EntityState<Item> {
  itemsLoaded: boolean;
  itemDeleted: boolean;
}

export const itemsAdapter: EntityAdapter<Item> =
  createEntityAdapter<Item>();

export const initialItemsState: ItemsState = itemsAdapter.getInitialState({
  itemsLoaded: false,
  itemDeleted: false
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
  on(ItemActions.loadItems,
    (state, action) => {
    const items = action.items.map(item => {
      return {
        ...item,
        publication_date: item.publication_date
      }
    })
      return {
        ...itemsAdapter.setAll(items, state),
        itemsLoaded: true
      }
    }
  ),
  on(ItemActions.clearItems,
    state => itemsAdapter.removeAll(state)
  ),
  on(ItemActions.itemDeleted,
    state => {
      return {
        ...state,
        itemDeleted: true
      }
    }
  ),
);

export function itemsReducer(state: ItemsState | undefined, action: Action) {
  return reducer(state, action);
}
