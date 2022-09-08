import {createSelector} from "@ngrx/store";
import {getCoreState} from "../index";
import {selectAll} from "./item.reducer";

const selectItemsState = createSelector(
  getCoreState,
  state => state.item
);

export const getAllItems = createSelector(
  selectItemsState,
  selectAll
);

export const itemsLoaded = createSelector(
  selectItemsState,
  state => state.itemsLoaded
)

export const getItemById = (id: string) => createSelector(
  getAllItems,
  items => {
    return items.find(item => item.id === id);
  }
);

export const getItemsById = (ids: string[]) => createSelector(
  getAllItems,
  items => {
    return items.filter(item => ids.includes(item.id));
  }
);

