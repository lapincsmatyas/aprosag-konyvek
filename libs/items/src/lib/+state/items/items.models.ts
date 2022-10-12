export interface Item {
  id?: string;
  title: string;
  subtitle: string;
  description: string;
  page_count: number;
  cover_type: COVER_TYPE;
  isbn: string;
  weight: number;
  publication_date: Date;
  storage_amount: number;
  price: ItemPrice;
  image_urls: string[];
}

export interface ItemPrice{
  price: number;
  discount_price?: number;
}

export enum COVER_TYPE {
  HARD_COVER,
  SOFT_COVER
}
