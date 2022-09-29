export enum COVER_TYPE {
  HARD_COVER,
  SOFT_COVER
}

export interface ItemDto {
  id?: string,
  title?: string,
  subtitle?: string,
  common_id?: string,
  description?: string,
  page_count?: number,
  cover_type?: COVER_TYPE,
  ISBN?: string,
  weight?: number,
  publication_date?: number,
  storage_amount?: number,
  price?: number,
  discount_price?: number,
  discount_percentage?: number,
  image_urls?: any[]
}
