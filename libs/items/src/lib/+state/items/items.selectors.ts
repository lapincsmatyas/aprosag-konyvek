import {createSelector} from "@ngrx/store";
import {itemsAdapter, ItemsState} from "./items.reducer";
import {getCoreState} from "items";

const getItemsState = createSelector(
  getCoreState,
  state => state.item
);

const { selectAll, selectEntities } = itemsAdapter.getSelectors();

export const getAllItems = createSelector(getItemsState, (state: ItemsState) =>
  selectAll(state)
);

export const getItemsEntities = createSelector(
  getItemsState,
  (state: ItemsState) => selectEntities(state)
);

export const getItemsLoaded = createSelector(
  getItemsState,
  state => state.itemsLoaded
)

export const getItemById = (id: string) => createSelector(
  getItemsEntities,
  (items) => (id ? items[id] : undefined)
);
