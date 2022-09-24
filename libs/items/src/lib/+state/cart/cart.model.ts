import {Item} from "../items/items.models";

export interface CartItem {
  id: string;
  item: Item;
  amount: number;
}
