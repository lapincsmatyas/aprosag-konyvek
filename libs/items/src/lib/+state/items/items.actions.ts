import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Item } from './items.models';

export const loadItemsByHttp = createAction(
  '[Item] Load Items By Http'
)

export const loadItemByHttp = createAction(
  '[Item] Load Item By Http',
  props<{ id: string }>()
)

export const loadItems = createAction(
  '[Item/API] Load Items',
  props<{ items: Item[] }>()
);

export const addItem = createAction(
  '[Item/API] Add Item',
  props<{ item: Item }>()
);

export const upsertItem = createAction(
  '[Item/API] Upsert Item',
  props<{ item: Item }>()
);

export const addItems = createAction(
  '[Item/API] Add Items',
  props<{ items: Item[] }>()
);

export const upsertItems = createAction(
  '[Item/API] Upsert Items',
  props<{ items: Item[] }>()
);

export const updateItem = createAction(
  '[Item/API] Update Item',
  props<{ item: Update<Item> }>()
);

export const updateItems = createAction(
  '[Item/API] Update Items',
  props<{ items: Update<Item>[] }>()
);

export const deleteItem = createAction(
  '[Item/API] Delete Item',
  props<{ id: string }>()
);

export const deleteItems = createAction(
  '[Item/API] Delete Items',
  props<{ ids: string[] }>()
);

export const clearItems = createAction(
  '[Item/API] Clear Items'
);

export const itemNotFound = createAction(
  '[Item/API] Item not found'
)
