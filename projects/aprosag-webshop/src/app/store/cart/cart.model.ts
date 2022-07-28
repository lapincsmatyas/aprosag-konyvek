import {Item} from "../item/item.model";

export interface CartItem {
  id: string;
  item: Item;
  amount: number;
}
