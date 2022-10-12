import { createSelector } from "@ngrx/store";
import { itemsAdapter, ItemsState } from "./items.reducer";
import { State } from "items";

const getCoreState = createSelector(
  (state: State) => state,
  (state: State) => state
)

const selectItemsState = createSelector(
  getCoreState,
  state => state.item
);

const { selectAll, selectEntities } = itemsAdapter.getSelectors();

export const selectAllItems = createSelector(selectItemsState, (state: ItemsState) =>
  selectAll(state)
);

export const selectItemsEntites = createSelector(
  selectItemsState,
  (state: ItemsState) => selectEntities(state)
);

export const selectItemsLoaded = createSelector(
  selectItemsState,
  state => state.itemsLoaded
)

export const selectItemDeleted = createSelector(
  selectItemsState,
  state => state.itemDeleted
)

export const selectItemById = (id: string) => createSelector(
  selectItemsEntites,
  (items) => (id ? items[id] : undefined)
);
