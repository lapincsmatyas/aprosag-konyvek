import {COVER_TYPE} from "../../model/item.model";

export interface Item {
  id: string ;
  title: string ;
  subtitle: string ;
  description: string ;
  page_count: number;
  cover_type: COVER_TYPE;
  ISBN: string ;
  weight: number;
  publication_date: number;
  storage_amount: number;
  price: number;
  discount_price: number;
  discount_percentage?: number;
  image_urls: string[];
}
