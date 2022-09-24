import {Item} from "data";

export interface CartItem {
  id: string;
  item: Item;
  amount: number;
}
